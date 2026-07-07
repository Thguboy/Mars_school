'use client';

import React from 'react';
import {
  Home,
  BookOpen,
  Globe,
  Code,
  MessageSquare,
  CreditCard,
  ShoppingBag,
  LayoutDashboard,
  Users,
  CheckSquare,
  BarChart3,
  Settings,
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  role: 'student' | 'teacher' | 'admin';
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active
        ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30'
        : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <Icon
      size={22}
      className={active ? 'text-white' : 'text-slate-400 group-hover:text-[#FF6B35]'}
    />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

export default function Sidebar({ role, activeTab, setActiveTab }: SidebarProps) {
  const getSidebarItems = () => {
    if (role === 'student') {
      return [
        { id: 'home', icon: Home, label: 'Asosiy sahifa' },
        { id: 'courses', icon: BookOpen, label: 'Mening kurslarim' },
        { id: 'eduverse', icon: Globe, label: 'Eduverse' },
        { id: 'marscode', icon: Code, label: 'MarsCode' },
        { id: 'blog', icon: MessageSquare, label: 'Blog' },
        { id: 'payment', icon: CreditCard, label: "Onlayn to'lov" },
        { id: 'shop', icon: ShoppingBag, label: 'Space shop' },
      ];
    }
    if (role === 'teacher') {
      return [
        { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'classes', icon: Users, label: 'Mening guruhlarim' },
        { id: 'attendance', icon: CheckSquare, label: "Yo'qlama" },
        { id: 'homework', icon: MessageSquare, label: 'Vazifalar' },
        { id: 'shop', icon: ShoppingBag, label: 'Space shop' },
      ];
    }
    return [
      { id: 'home', icon: BarChart3, label: 'Analitika' },
      { id: 'users', icon: Users, label: 'Foydalanuvchilar' },
      { id: 'courses', icon: BookOpen, label: 'Kurslar' },
      { id: 'shop', icon: ShoppingBag, label: 'Shop Manager' },
      { id: 'settings', icon: Settings, label: 'Sozlamalar' },
    ];
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-6 fixed h-screen z-20">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center">
          <Globe className="text-white" size={24} />
        </div>
        <span className="text-xl font-black text-slate-800 tracking-tight italic">
          MARS <span className="text-[#FF6B35]">SPACE</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {getSidebarItems().map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </nav>

      {/* 3D Mascot Replacement */}
      <div className="mt-auto relative p-4 rounded-3xl bg-gradient-to-br from-[#FF6B35]/10 to-[#FFB703]/10 border border-[#FF6B35]/20 overflow-hidden group">
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-[#FF6B35] uppercase mb-1">Mars Buddy</p>
          <p className="text-xs text-slate-600 leading-tight">
            Yangi darslarni o'zlashtirishda omad!
          </p>
        </div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#FF6B35]/20 rounded-full blur-2xl group-hover:bg-[#FF6B35]/30 transition-all duration-500" />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute bottom-1 right-2 text-4xl"
        >
          🚀
        </motion.div>
      </div>
    </aside>
  );
}
