'use client';

import React from 'react';
import { Bell, User, Zap, Coins, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  role: string;
  setRole: (role: 'student' | 'teacher' | 'admin') => void;
}

const StatBadge = ({
  icon: Icon,
  value,
  color,
}: {
  icon: any;
  value: string | number;
  color: string;
}) => (
  <div
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${color} bg-opacity-10 border border-current border-opacity-20`}
  >
    <Icon size={18} className={color.replace('bg-', 'text-')} />
    <span className={`font-bold text-sm ${color.replace('bg-', 'text-')}`}>{value}</span>
  </div>
);

export default function Header({ role, setRole }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <StatBadge icon={Coins} value="1,250" color="text-[#FFB703]" />
          <StatBadge icon={Zap} value="85%" color="text-[#FF6B35]" />
        </div>
        <Badge className="bg-[#7209B7] text-white hover:bg-[#7209B7]/90 px-4 py-1.5 rounded-full cursor-pointer transition-transform hover:scale-105">
          PRO Obuna
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Qidiruv..."
            className="bg-white border border-slate-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 w-64 transition-all"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-500">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Bildirishnomalar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-default">
                <div className="font-bold text-xs flex justify-between w-full">
                  <span>Vazifa tekshirildi</span>
                  <span className="text-slate-400 font-normal">5 daq avval</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  "Node.js API" vazifangiz o'qituvchi tomonidan tekshirildi va 100 XP berildi!
                </p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer pl-2 border-l border-slate-200 ml-2">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-slate-800">Umidbek</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {role}
                </div>
              </div>
              <Avatar className="h-10 w-10 ring-2 ring-[#FF6B35]/10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Umid" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mening profilim</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" /> Profil sozlamalari
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-[10px] text-slate-400 uppercase">
              Rolni almashtirish (Demo)
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => setRole('student')}
              className={`cursor-pointer ${role === 'student' ? 'bg-slate-100 font-bold' : ''}`}
            >
              🧑‍🎓 Student Paneli
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRole('teacher')}
              className={`cursor-pointer ${role === 'teacher' ? 'bg-slate-100 font-bold' : ''}`}
            >
              🧑‍🏫 Teacher Paneli
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRole('admin')}
              className={`cursor-pointer ${role === 'admin' ? 'bg-slate-100 font-bold' : ''}`}
            >
              👑 Admin Paneli
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" /> Chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
