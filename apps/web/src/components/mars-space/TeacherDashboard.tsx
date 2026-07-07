'use client';

import React from 'react';
import { User, Crown, ChevronRight, Users, CheckSquare, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function TeacherDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Guruhlar',
              value: '8 ta',
              icon: Users,
              color: 'text-blue-500',
              bg: 'bg-blue-50',
            },
            {
              label: "O'quvchilar",
              value: '124 ta',
              icon: User,
              color: 'text-green-500',
              bg: 'bg-green-50',
            },
            {
              label: 'Reyting',
              value: '4.9/5',
              icon: Crown,
              color: 'text-yellow-500',
              bg: 'bg-yellow-50',
            },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${stat.bg}`}>
                    <stat.icon className={stat.color} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                    <div className="text-xl font-bold">{stat.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Mening Guruhlarim</CardTitle>
            <Button variant="outline" size="sm">
              Barcha guruhlar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {['nBPro-340', 'nBPro-341', 'FE-201'].map((group, i) => (
              <div
                key={group}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-slate-400">
                    {group.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold">{group}</div>
                    <div className="text-xs text-slate-400">18 ta o'quvchi • Back-End PRO</div>
                  </div>
                </div>
                <div className="w-32">
                  <div className="flex justify-between text-[10px] mb-1 font-bold">
                    <span>Progress</span>
                    <span>{45 + i * 15}%</span>
                  </div>
                  <Progress value={45 + i * 15} className="h-1.5" />
                </div>
                <Button size="sm" variant="ghost" className="text-[#FF6B35]">
                  <ChevronRight size={18} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="text-green-500" /> Bugungi Yo'qlama (Attendance)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 mb-4">Hozirda faol dars mavjud emas</p>
              <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white">
                Darsni boshlash
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold">
              Tekshirilishi kutilayotgan vazifalar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=hw${i}`} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">Ali Valiyev</div>
                  <div className="text-[10px] text-slate-400">Node.js API project</div>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  Bugun
                </Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs text-slate-400 mt-2">
              Barchasini ko'rish
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-[#7209B7] text-white">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Crown size={16} className="text-[#FFB703]" /> Mukofotlash Stantsiyasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-purple-200 mb-4">
              O'quvchilarga a'lo ishtiroki uchun XP va Coin taqdim eting
            </p>
            <Button className="w-full bg-white text-[#7209B7] hover:bg-white/90">
              Mukofotlash
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
