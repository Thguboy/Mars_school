// Main client functionality for MARS SPACE Student Portal
document.addEventListener("DOMContentLoaded", () => {
    // 1. Sidebar tab switching
    const navItems = document.querySelectorAll(".nav-item");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const pageTitle = document.getElementById("current-page-title");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetTab = item.getAttribute("data-target");
            switchTab(targetTab);
        });
    });

    window.switchTab = (tabId) => {
        // Toggle active menu items
        navItems.forEach(nav => {
            if (nav.getAttribute("data-target") === tabId) {
                nav.classList.add("active");
            } else {
                nav.classList.remove("active");
            }
        });

        // Toggle active page panel
        tabPanels.forEach(panel => {
            if (panel.id === `panel-${tabId}`) {
                panel.classList.add("active-panel");
            } else {
                panel.classList.remove("active-panel");
            }
        });

        // Set Header Title
        const titleMap = {
            "home": "Asosiy sahifa",
            "courses": "Mening kurslarim",
            "eduverse": "Eduverse",
            "marscode": "<MarsCode/> Dasturlash Masalalari",
            "blog": "Blog Feed",
            "payment": "Onlayn To'lov Tizimi",
            "shop": "Space Shop"
        };
        pageTitle.innerText = titleMap[tabId] || "Dashboard";
    };

    // Load initial stats from backend API
    updateStatsDisplay();
});

// Toast message alert
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    
    let icon = '<i class="fa-solid fa-circle-check text-green"></i>';
    if (type === "error") {
        icon = '<i class="fa-solid fa-circle-xmark" style="color: #E53E3E;"></i>';
        toast.style.borderLeftColor = "#E53E3E";
    } else if (type === "warning") {
        icon = '<i class="fa-solid fa-triangle-exclamation" style="color: #DD6B20;"></i>';
        toast.style.borderLeftColor = "#DD6B20";
    }

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Stats synchronize with backend API
async function updateStatsDisplay() {
    try {
        const response = await fetch("/api/stats");
        const stats = await response.json();
        
        document.getElementById("stat-wallet").innerText = formatAmount(stats.wallet);
        document.getElementById("stat-streak").innerText = stats.streak;
        document.getElementById("stat-coins").innerText = stats.coins;
        document.getElementById("stat-energy").innerText = stats.energy;

        // Balance info under Payment page
        const debtValue = document.getElementById("text-debt-value");
        if (stats.wallet > 0) {
            // Simulated debt calculation based on wallet
            const val = Math.max(0, 1090000 - (stats.streak * 10000));
            if (debtValue) debtValue.innerText = formatAmount(val) + " so'm";
        }

        // Update active subscription look
        const subBtn = document.getElementById("subscribe-btn");
        if (stats.subscription && subBtn) {
            subBtn.classList.add("subscribed");
            subBtn.innerHTML = '<i class="fa-solid fa-certificate"></i> <span>Obuna faol</span>';
            subBtn.onclick = null;
        }
    } catch (e) {
        console.error("Stats fetching failed.", e);
    }
}

// Util amount formatting
function formatAmount(num) {
    return num.toLocaleString('uz-UZ', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(/,/g, ' ');
}

// Activate PRO obuna
async function activateSubscription() {
    try {
        const response = await fetch("/api/subscribe", {
            method: "POST"
        });
        const res = await response.json();
        if (res.success) {
            showToast(res.message);
            updateStatsDisplay();
        }
    } catch(e) {
        console.error("Subscription failed", e);
    }
}

// 2. Play Video Modal Integration
function playVideo(youtubeId) {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("youtube-player-iframe");
    const title = document.getElementById("video-modal-title");
    
    const videoTitles = {
        "qRUSKrHT1Y4": "Back-End PRO (Guruh: nBPro-340) - 1-Video darslik",
        "_cs2Hvw1MFk": "CyberSecurity (Guruh: CBS-414) - Yo'naltirish darsi",
        "MqrSRrtBroc": "Beginner kurslari video darsi"
    };

    title.innerText = videoTitles[youtubeId] || "Kurs video darsi";
    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    modal.classList.add("active");
}

function closeVideoModal() {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("youtube-player-iframe");
    iframe.src = "";
    modal.classList.remove("active");
}

// 3. Category Filter for Eduverse
function filterEduverse(category) {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        if (btn.innerText.includes(category) || (category === "barchasi" && btn.innerText === "Barchasi")) {
            btn.classList.add("active-filter");
        } else {
            btn.classList.remove("active-filter");
        }
    });

    const items = document.querySelectorAll(".eduverse-card-item");
    items.forEach(item => {
        const itemCat = item.getAttribute("data-category");
        if (category === "barchasi" || itemCat === category) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// 4. Online Payment processing
function updatePaymentBtnLabel(val) {
    const numeric = parseFloat(val) || 0;
    const btn = document.getElementById("execute-pay-btn");
    if (btn) {
        btn.querySelector("span").innerText = `To'lov qilish ${formatAmount(numeric)} so'm`;
    }
    const textDue = document.getElementById("text-due-value");
    if (textDue) {
        textDue.innerText = `${formatAmount(numeric)} so'm`;
    }
}

async function executeOnlinePayment() {
    const inputAmountObj = document.getElementById("payment-amount-val");
    const amount = parseFloat(inputAmountObj.value) || 0;
    
    if (amount <= 0) {
        showToast("To'lov summasi 0 dan katta bo'lishi kerak!", "error");
        return;
    }

    try {
        const response = await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: amount })
        });
        
        const res = await response.json();
        if (response.ok && res.success) {
            showToast(res.message);
            updateStatsDisplay();
        } else {
            showToast(res.message || "To'lovda xatolik yuz berdi", "error");
        }
    } catch(e) {
        showToast("Server bilan bog'lanishda xatolik!", "error");
    }
}

// 5. Space Shop Purchases
async function buyShopItem(itemId, price, stock) {
    if (stock <= 0) {
        showToast("Ushbu mahsulot qolmagan!", "error");
        return;
    }

    const currentCoins = parseInt(document.getElementById("stat-coins").innerText) || 0;
    if (currentCoins < price) {
        showToast("Mars tangalaringiz (Coin) yetarli emas! 🪙", "warning");
        return;
    }

    try {
        const response = await fetch("/api/shop/buy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: itemId })
        });
        const res = await response.json();
        if (response.ok && res.success) {
            showToast(res.message);
            updateStatsDisplay();
            // Client side stock reduce
            const stockLabel = document.getElementById(`stock-${itemId}`);
            if (stockLabel) {
                const newStock = stock - 1;
                stockLabel.innerText = `${newStock} ta qoldi`;
                if (newStock <= 0) {
                    stockLabel.classList.add("out");
                    const card = document.getElementById(`shop-item-${itemId}`);
                    const btn = card.querySelector(".btn-buy");
                    btn.classList.add("disabled-buy");
                    btn.onclick = null;
                }
            }
        } else {
            showToast(res.message, "error");
        }
    } catch(e) {
        showToast("Bog'lanishda xatolik yuz berdi!", "error");
    }
}

function switchShopTab(tabName) {
    const tabs = document.querySelectorAll(".shop-tab");
    tabs.forEach(tab => {
        if (tab.innerText === tabName) {
            tab.classList.add("active-shop-tab");
        } else {
            tab.classList.remove("active-shop-tab");
        }
    });
    showToast(`O'tildi: ${tabName}`);
}

// 6. Blog Feed Actions
async function toggleLike(postId, btn) {
    try {
        const response = await fetch("/api/blog/like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: postId })
        });
        const res = await response.json();
        if (res.success) {
            const countLabel = btn.querySelector(".like-counts");
            countLabel.innerText = res.likes;
            if (res.liked) {
                btn.classList.add("liked");
            } else {
                btn.classList.remove("liked");
            }
        }
    } catch(e) {
        console.error("Like toggle failed", e);
    }
}

async function handleCommentSubmit(e, postId, input) {
    if (e.key === "Enter") {
        sendComment(postId, input);
    }
}

function sendCommentClick(postId, btn) {
    const row = btn.parentElement;
    const input = row.querySelector(".comment-box-input");
    sendComment(postId, input);
}

async function sendComment(postId, input) {
    const val = input.value.trim();
    if (!val) return;

    try {
        const response = await fetch("/api/blog/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: postId, text: val })
        });
        const res = await response.json();
        if (res.success) {
            // Append comment on screen
            const commentsContainer = input.parentElement.previousElementSibling;
            const commentItem = document.createElement("div");
            commentItem.className = "comment-item";
            commentItem.innerHTML = `<strong>Saidaxmatov Saidaziz:</strong> <span>${val}</span>`;
            commentsContainer.appendChild(commentItem);
            commentsContainer.scrollTop = commentsContainer.scrollHeight;
            input.value = "";
            showToast("Izoh qoldirildi!");
        }
    } catch(e) {
        console.error("Comment post error", e);
    }
}

function triggerMockUpload() {
    showToast("Fayl tanlash oynasi faollashmoqda (Demo)");
}

async function submitPost() {
    const input = document.getElementById("post-input-text");
    const val = input.value.trim();
    if (!val) {
        showToast("Matn kiritilmadi!", "warning");
        return;
    }

    try {
        const response = await fetch("/api/blog/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: val })
        });
        const res = await response.json();
        if (response.ok && res.success) {
            showToast("Yangi blog post chop etildi! +5 coin 🪙");
            input.value = "";
            renderBlogFeed(res.posts);
            updateStatsDisplay();
        }
    } catch(e) {
        console.error("Post creation error", e);
    }
}

function renderBlogFeed(posts) {
    const container = document.getElementById("feed-container");
    container.innerHTML = "";
    
    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "feed-card";
        
        let commentItemsHtml = "";
        post.comments.forEach(c => {
            commentItemsHtml += `
                <div class="comment-item">
                    <strong>${c.author}:</strong>
                    <span>${c.text}</span>
                </div>
            `;
        });
        
        card.innerHTML = `
            <div class="feed-card-header">
                <img src="${post.avatar}" class="feed-avatar">
                <div class="feed-author-meta">
                    <div class="feed-author-name">${post.author}</div>
                    <div class="feed-time">${post.time}</div>
                </div>
                <i class="fa-solid fa-ellipsis feed-options-dot"></i>
            </div>
            
            <div class="feed-content-body">
                <p class="post-text">${post.content}</p>
                ${post.image ? `
                <div class="post-card-graphic">
                    <div class="stat-badge-graphic">
                        <div class="mock-card-data-accent">${post.title}</div>
                        <div class="sparkling-glow"></div>
                    </div>
                </div>` : ''}
            </div>

            <div class="feed-actions-counts">
                <button class="feed-action-btn like-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id}, this)">
                    <i class="fa-regular fa-heart"></i>
                    <span class="like-counts">${post.likes}</span>
                </button>
                <button class="feed-action-btn">
                    <i class="fa-regular fa-comment"></i>
                    <span class="comment-counts">${post.comments.length}</span>
                </button>
            </div>

            <div class="comments-section-block">
                <div class="comments-list">
                    ${commentItemsHtml}
                </div>
                <div class="comment-input-row">
                    <input type="text" placeholder="Comment..." class="comment-box-input" onkeydown="handleCommentSubmit(event, ${post.id}, this)">
                    <button class="btn-send-comment" onclick="sendCommentClick(${post.id}, this)"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 7. General typing test simulator inside Asosiy sahifa
function startTypingSimulator() {
    const wpmText = document.getElementById("home-wpm");
    let speed = 45;
    showToast("Typing test boshlandi! Matnni yozing...");
    
    // Simulate speed progression
    const interval = setInterval(() => {
        speed += Math.floor(Math.random() * 5) - 2;
        wpmText.innerText = Math.max(30, speed);
    }, 400);

    setTimeout(() => {
        clearInterval(interval);
        showToast("Typing test yakunlandi! Natija saqlandi.");
    }, 5000);
}

// 8. Head notifications dropdown
function toggleNotifications() {
    const dropdown = document.getElementById("notification-menu");
    dropdown.classList.toggle("active");
}

// 9. Floating Robot message bubble interactions
const robotPhrases = [
    "Bugun darslarni davom ettirasizmi? 🚀",
    "Space Shop do'konimizga yangi breloklar keldi! 🛍",
    "Kod yozish orqali tangalaringizni ko'paytiring! 💻",
    "Kayfiyat postini blogga yozishni unutmang, buning uchun coin beriladi! 🪙",
    "Kiberxavfsizlik darsini boshlashga nima deysiz? 💫",
    "Qiyinchiliklar bo'lsa AI Yordamchini chaqiring! 🤖"
];
function speakRobot() {
    const bubble = document.getElementById("robot-bubble");
    const phrase = robotPhrases[Math.floor(Math.random() * robotPhrases.length)];
    bubble.innerText = phrase;
    bubble.style.opacity = 1;
    setTimeout(() => {
        bubble.style.opacity = 0;
    }, 4000);
}

// 10. AI Assistant Drawer Chat
function toggleAIChat() {
    const drawer = document.getElementById("ai-chat-drawer");
    drawer.classList.toggle("active");
}

function handleChatSubmit(e) {
    if (e.key === "Enter") {
        sendAIChatMessage();
    }
}

async function sendAIChatMessage() {
    const input = document.getElementById("ai-user-message-input");
    const text = input.value.trim();
    if (!text) return;

    const chatMessagesWrap = document.getElementById("chat-messages-wrap");

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.className = "msg-item user-msg";
    userMsg.innerHTML = `<p>${text}</p><span class="msg-time">Hozir</span>`;
    chatMessagesWrap.appendChild(userMsg);
    chatMessagesWrap.scrollTop = chatMessagesWrap.scrollHeight;

    input.value = "";

    // Add typing loader
    const botLoadingMsg = document.createElement("div");
    botLoadingMsg.className = "msg-item bot-msg loading-msg";
    botLoadingMsg.innerHTML = `<p><i class="fa-solid fa-spinner fa-spin"></i> Javob yozilmoqda...</p>`;
    chatMessagesWrap.appendChild(botLoadingMsg);
    chatMessagesWrap.scrollTop = chatMessagesWrap.scrollHeight;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });
        const res = await response.json();
        
        // Remove loader and insert response
        botLoadingMsg.remove();
        
        const botMsg = document.createElement("div");
        botMsg.className = "msg-item bot-msg";
        botMsg.innerHTML = `<p>${res.reply}</p><span class="msg-time">Hozir</span>`;
        chatMessagesWrap.appendChild(botMsg);
        chatMessagesWrap.scrollTop = chatMessagesWrap.scrollHeight;
    } catch(e) {
        botLoadingMsg.remove();
        console.error("AI chat communication error", e);
    }
}
