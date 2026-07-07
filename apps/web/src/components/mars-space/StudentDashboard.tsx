'use client';

import React from 'react';
import { Code, ShoppingBag, Zap, Crown, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';

const LEADERBOARD_DATA = [
  {
    rank: 1,
    name: 'Azizbek',
    level: 15,
    xp: 4500,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aziz',
  },
  {
    rank: 2,
    name: 'Dilnoza',
    level: 14,
    xp: 4200,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dilnoza',
  },
  {
    rank: 3,
    name: 'Jasur',
    level: 14,
    xp: 4100,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasur',
  },
  {
    rank: 4,
    name: 'Malika',
    level: 13,
    xp: 3800,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Malika',
  },
  {
    rank: 5,
    name: 'Otabek',
    level: 12,
    xp: 3500,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Otabek',
  },
];

const SCHEDULE_DAYS = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];

export default function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2 space-y-6">
        {/* Level Progression Map */}
        <Card className="border-none shadow-sm overflow-hidden relative min-h-[200px] bg-gradient-to-br from-slate-50 to-white">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-[#FF6B35] rounded-full" />
            <div className="absolute bottom-10 right-20 w-32 h-32 border-4 border-[#7209B7] rounded-full" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Crown className="text-[#FFB703]" /> Darajangiz: LVL 9
              </CardTitle>
              <p className="text-slate-400 text-sm mt-1">Keyingi darajagacha 450 XP qoldi</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#7209B7] hover:text-[#7209B7] hover:bg-purple-50"
            >
              Batafsil <ChevronRight size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative py-8 px-4">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex items-center relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFB703]"
                />
                {/* Path markers */}
                {[20, 40, 65, 85].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-sm transition-all duration-300 ${pos <= 65 ? 'bg-[#FF6B35]' : 'bg-slate-300'}`}
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs font-bold text-slate-400">
                <span>LVL 8</span>
                <span className="text-[#FF6B35]">LVL 9</span>
                <span>LVL 10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Course Card */}
          <Card className="border-none shadow-sm group hover:shadow-md transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge className="bg-blue-100 text-blue-600 border-none mb-2">
                  [New] Back-End PRO
                </Badge>
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                  0%
                </div>
              </div>
              <CardTitle className="text-lg">Darslarni davom ettirish</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-sm mb-4">
                Siz oxirgi marta "Node.js asoslari" darsida to'xtagan edingiz.
              </p>
              <Button className="w-full bg-[#7209B7] hover:bg-[#7209B7]/90 text-white gap-2">
                Davom etish <ChevronRight size={18} />
              </Button>
            </CardContent>
          </Card>

          {/* Typing Test / Game Integration */}
          <Card className="border-none shadow-sm bg-[#2EC4B6]/5 border-t-4 border-[#2EC4B6]">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="text-[#2EC4B6]" /> MarsCode: Typing Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-2">
                <div className="text-4xl font-black text-[#2EC4B6]">45</div>
                <div className="text-xs text-slate-400 font-medium">WPM (O'rtacha tezlik)</div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6] hover:text-white"
              >
                Testni boshlash
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Schedule */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Qo'shimcha darslar jadvali</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {SCHEDULE_DAYS.map((day) => (
                <div key={day} className="text-center space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {day}
                  </div>
                  <button className="w-full aspect-square rounded-xl bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center transition-colors group">
                    <Plus size={20} className="text-slate-300 group-hover:text-[#FF6B35]" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        <Card className="border-none shadow-sm bg-gradient-to-b from-[#7209B7] to-[#5a078f] text-white">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="text-[#FFB703]" /> Season #12
            </CardTitle>
            <p className="text-purple-200 text-xs">Mavsum tugashiga: 12 kun qoldi</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold">Leaderboard</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase">
                  Top 100
                </span>
              </div>
              <div className="space-y-3">
                {LEADERBOARD_DATA.map((user) => (
                  <div key={user.rank} className="flex items-center gap-3 group">
                    <span
                      className={`w-6 text-center text-xs font-bold ${user.rank === 1 ? 'text-[#FFB703]' : 'text-purple-300'}`}
                    >
                      #{user.rank}
                    </span>
                    <Avatar className="h-8 w-8 border border-white/20">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate">{user.name}</div>
                      <div className="text-[10px] text-purple-200">
                        LVL {user.level} • {user.xp} XP
                      </div>
                    </div>
                    {user.rank === 1 && <Crown size={14} className="text-[#FFB703]" />}
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-xs text-purple-200 hover:text-white hover:bg-white/10"
              >
                Barchasini ko'rish
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Preview */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#FF6B35]" /> Space Shop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-xl bg-slate-100 aspect-video mb-3 flex items-center justify-center">
              <div className="text-slate-400 font-bold text-xs">Mars Hoodie</div>
              <Badge className="absolute top-2 right-2 bg-[#FFB703] text-black border-none">
                500 Coins
              </Badge>
            </div>
            <Button variant="outline" className="w-full text-xs border-slate-200">
              Shopga o'tish
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
