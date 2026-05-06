/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Dumbbell, 
  UtensilsCrossed, 
  User, 
  Search, 
  QrCode, 
  ChevronDown, 
  Camera, 
  Barcode, 
  Star, 
  Droplets, 
  Plus, 
  CheckCircle, 
  Clock, 
  CircleAlert, 
  Sparkles,
  ArrowRight,
  Activity,
  Zap,
  Target,
  ChevronRight,
  ChevronLeft,
  Utensils,
  Copy,
  ArrowLeft,
  Check,
  Trash2
} from 'lucide-react';

interface Food {
  id: string;
  name: string;
  kcal: number;
  unit: string;
  amount: number;
  image: string;
  p?: number;
  f?: number;
  c?: number;
  fiber?: number;
  sodium?: number;
}

const COMMON_FOODS: Food[] = [
  { id: 'f1', name: '苹果', kcal: 124, unit: '克', amount: 233.00, p: 0.6, f: 0.4, c: 32.2, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=200&h=200&fit=crop' },
  { id: 'f2', name: '南巨 营养米粉', kcal: 232, unit: '克', amount: 60.00, p: 8.2, f: 2.1, c: 45.4, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop' },
  { id: 'f3', name: '越式牛肉粉', kcal: 406, unit: '克', amount: 450.00, p: 24.5, f: 12.2, c: 49.3, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop' },
  { id: 'f4', name: '米饭', kcal: 487, unit: '克', amount: 420.00, p: 10.8, f: 1.2, c: 108.5, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=200&h=200&fit=crop' },
  { id: 'f5', name: '三文鱼刺身', kcal: 553, unit: '克', amount: 350.00, p: 70.0, f: 30.5, c: 0.0, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop' },
  { id: 'f6', name: '蔬菜汁', kcal: 81, unit: '毫升', amount: 300.00, p: 1.5, f: 0.3, c: 18.2, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=200&h=200&fit=crop' },
  { id: 'f7', name: '香蕉', kcal: 115, unit: '根(大)', amount: 1.00, p: 1.3, f: 0.4, c: 27.0, image: 'https://images.unsplash.com/photo-1528825876204-8636a0480352?w=200&h=200&fit=crop' },
];
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// --- Types ---

type Tab = 'home' | 'workout' | 'nutrition' | 'profile';

interface Meal {
  id: string;
  time: string;
  name: string;
  p: number;
  c: number;
  f: number;
  kcal: number;
  tip: string;
  status: 'pending' | 'logged';
  timingLabel: string;
  loggedAt?: string;
  foods?: Food[];
}

interface Exercise {
  name: string;
  sets: string;
}

interface WorkoutDay {
  id: string;
  title: string;
  icon: React.ReactNode;
  exercises: Exercise[];
}

// --- Data ---

const MEALS: Meal[] = [
  {
    id: '1',
    time: '07:30',
    name: '早餐',
    p: 35,
    c: 60,
    f: 12,
    kcal: 488,
    tip: '加入2个鸡蛋和1杯燕麦粥，开启全天代谢。',
    status: 'pending',
    timingLabel: '唤醒能量'
  },
  {
    id: '2',
    time: '10:30',
    name: '早加餐',
    p: 20,
    c: 15,
    f: 10,
    kcal: 230,
    tip: '一份希腊酸奶加少量坚果，保持稳定的合成环境。',
    status: 'pending',
    timingLabel: '持续合成'
  },
  {
    id: '3',
    time: '12:30',
    name: '午餐',
    p: 45,
    c: 80,
    f: 15,
    kcal: 635,
    tip: '鸡胸肉配糙米饭与西兰花，经典的营养黄金组合。',
    status: 'pending',
    timingLabel: '性能燃料'
  },
  {
    id: '4',
    time: '15:30',
    name: '午加餐',
    p: 25,
    c: 40,
    f: 5,
    kcal: 305,
    tip: '一根香蕉加一勺乳清蛋白，为接下来的训练储备糖原。',
    status: 'pending',
    timingLabel: '练前充能'
  },
  {
    id: '5',
    time: '19:00',
    name: '晚餐',
    p: 50,
    c: 50,
    f: 18,
    kcal: 562,
    tip: '牛排或三文鱼配土豆，修复受损肌纤维。',
    status: 'pending',
    timingLabel: '修复基石'
  },
  {
    id: '6',
    time: '22:00',
    name: '晚加餐',
    p: 30,
    c: 5,
    f: 2,
    kcal: 158,
    tip: '酪蛋白或慢消化蛋白来源，在睡眠中持续供能。',
    status: 'pending',
    timingLabel: '深度修复'
  }
];

const WORKOUT_PLANS: Record<string, WorkoutDay[]> = {
  '零基础入门方案': [
    {
      id: 'D01',
      title: '胸部 & 肩部',
      icon: <Dumbbell className="w-5 h-5" />,
      exercises: [
        { name: '杠铃卧推', sets: '4x10' },
        { name: '杠铃推举', sets: '4x10' },
        { name: '上斜哑铃卧推', sets: '3x12' },
      ]
    },
    {
      id: 'D02',
      title: '背部 & 核心',
      icon: <CheckCircle className="w-5 h-5" />,
      exercises: [
        { name: '杠铃划船', sets: '4x10' },
        { name: '高位下拉', sets: '4x12' },
        { name: '面拉', sets: '3x15' },
      ]
    },
    {
      id: 'D03',
      title: '腿部训练',
      icon: <Plus className="w-5 h-5" />,
      exercises: [
        { name: '杠铃深蹲', sets: '4x8' },
        { name: '罗马尼亚硬拉', sets: '4x10' },
        { name: '腿举', sets: '3x12' },
      ]
    }
  ],
  '推拉计划': [
    {
      id: 'D01',
      title: '推 (Push) - 胸/肩/三头',
      icon: <Zap className="w-5 h-5" />,
      exercises: [
        { name: '杠铃卧推', sets: '4x8-10' },
        { name: '上斜哑铃卧推', sets: '3x10' },
        { name: '哑铃推举', sets: '3x10-12' },
        { name: '侧平举', sets: '3x15' },
        { name: '双杠臂屈伸', sets: '3x12' },
        { name: '绳索下压', sets: '3x15' },
      ]
    },
    {
      id: 'D02',
      title: '拉 (Pull) - 背/二头',
      icon: <Activity className="w-5 h-5" />,
      exercises: [
        { name: '引体向上', sets: '3xMAX' },
        { name: '杠铃划船', sets: '4x10' },
        { name: '坐姿划船', sets: '3x12' },
        { name: '杠铃弯举', sets: '3x12' },
        { name: '锤式弯举', sets: '3x12' },
        { name: '面拉', sets: '3x15' },
      ]
    },
    {
      id: 'D03',
      title: '下肢 (Legs) - 腿/臀',
      icon: <Target className="w-5 h-5" />,
      exercises: [
        { name: '杠铃深蹲', sets: '4x8' },
        { name: '罗马尼亚硬拉', sets: '4x10' },
        { name: '腿举', sets: '3x12' },
        { name: '腿弯举', sets: '3x15' },
        { name: '提踵', sets: '4x20' },
      ]
    }
  ],
  '三分化计划': [
    {
      id: 'D01',
      title: '胸部 & 三头',
      icon: <Dumbbell className="w-5 h-5" />,
      exercises: [
        { name: '杠铃卧推', sets: '4x8' },
        { name: '上斜哑铃卧推', sets: '3x10' },
        { name: '哑铃飞鸟', sets: '3x12' },
        { name: '仰卧臂屈伸', sets: '3x12' },
        { name: '绳索下压', sets: '3x15' },
      ]
    },
    {
      id: 'D02',
      title: '背部 & 二头',
      icon: <Activity className="w-5 h-5" />,
      exercises: [
        { name: '高位下拉', sets: '4x10' },
        { name: '杠铃划船', sets: '4x10' },
        { name: '坐姿划船', sets: '3x12' },
        { name: '双杠弯举', sets: '3x12' },
        { name: '集中弯举', sets: '3x12' },
      ]
    },
    {
      id: 'D03',
      title: '肩部 & 腿部',
      icon: <Target className="w-5 h-5" />,
      exercises: [
        { name: '杠铃推举', sets: '4x8' },
        { name: '侧平举', sets: '4x15' },
        { name: '杠铃深蹲', sets: '4x8' },
        { name: '腿屈伸', sets: '3x12' },
        { name: '俯卧腿弯举', sets: '3x12' },
      ]
    }
  ],
  '五分化计划': [
    {
      id: 'D01',
      title: '胸部针对性训练',
      icon: <Dumbbell className="w-5 h-5" />,
      exercises: [
        { name: '杠铃卧推', sets: '4x10' },
        { name: '上斜哑铃卧推', sets: '3x12' },
        { name: '绳索夹胸', sets: '3x15' },
        { name: '双杠臂屈伸', sets: '3x12' },
      ]
    },
    {
      id: 'D02',
      title: '背部深度训练',
      icon: <Activity className="w-5 h-5" />,
      exercises: [
        { name: '硬拉', sets: '3x5' },
        { name: '正手引体向上', sets: '4x10' },
        { name: '杠铃划船', sets: '3x12' },
        { name: '单臂哑铃划船', sets: '3x12' },
      ]
    },
    {
      id: 'D03',
      title: '肩部立体化训练',
      icon: <Target className="w-5 h-5" />,
      exercises: [
        { name: '杠铃推举', sets: '4x10' },
        { name: '哑铃前平举', sets: '3x12' },
        { name: '哑铃侧平举', sets: '3x15' },
        { name: '反向飞鸟', sets: '3x15' },
      ]
    },
    {
      id: 'D04',
      title: '腿部重载训练',
      icon: <Plus className="w-5 h-5" />,
      exercises: [
        { name: '杠铃深蹲', sets: '4x8' },
        { name: '腿举', sets: '3x12' },
        { name: '坐姿腿屈伸', sets: '3x15' },
        { name: '俯卧腿弯举', sets: '3x12' },
      ]
    },
    {
      id: 'D05',
      title: '手臂高容量训练',
      icon: <Zap className="w-5 h-5" />,
      exercises: [
        { name: '杠铃弯举', sets: '3x12' },
        { name: '绳索下压', sets: '3x12' },
        { name: '哑铃锤式弯举', sets: '3x12' },
        { name: '碎颅者', sets: '3x12' },
        { name: '牧师凳弯举', sets: '3x12' },
      ]
    }
  ]
};

// --- Sub-components ---

const TopAppBar = ({ activeTab }: { activeTab: Tab }) => (
  <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-surface-container-highest flex justify-between items-center px-4 h-14">
    <div className="flex items-center gap-3">
      <h1 className="text-[11px] font-black text-primary tracking-[0.25em] uppercase leading-none mt-1">METRIC_LAB</h1>
    </div>
    <div className="flex items-center gap-4 text-primary">
      {activeTab === 'home' && <Search className="w-5 h-5" />}
      {activeTab === 'profile' && (
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="label-sm text-[10px] uppercase font-bold">扫码</span>
          <QrCode className="w-5 h-5" />
        </div>
      )}
    </div>
  </header>
);

const BottomNavBar = ({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) => {
  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'workout', label: '训练', icon: Dumbbell },
    { id: 'nutrition', label: '营养', icon: UtensilsCrossed },
    { id: 'profile', label: '个人', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-surface-container-highest h-16 flex justify-around items-center px-2 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 ${
              isActive 
                ? 'text-on-primary-container bg-secondary-container rounded-full px-5 py-1 shadow-sm' 
                : 'text-on-surface-variant hover:text-primary w-16'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
            <span className={`label-sm text-[10px] uppercase mt-0.5 font-bold`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const CalorieGauge = ({ remaining }: { remaining: number }) => {
  const data = [
    { name: '已摄入', value: 3000 - remaining },
    { name: '剩余', value: remaining },
  ];
  const COLORS = ['#e3e2e7', '#0070eb'];

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={45}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell key={`cell-0`} fill={COLORS[0]} />
            <Cell key={`cell-1`} fill={COLORS[1]} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-[13px] font-black text-primary-container leading-none">{remaining}</span>
        <span className="text-[9px] font-black text-on-surface-variant uppercase mt-1 leading-tight">剩余<br />千卡</span>
      </div>
    </div>
  );
};

import { 
  format, 
  addDays, 
  startOfWeek, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfDay, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval 
} from 'date-fns';
import { zhCN } from 'date-fns/locale';


const WaterInputModal = ({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: (amount: number) => void;
}) => {
  const [amount, setAmount] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-xs bg-surface rounded-3xl overflow-hidden relative z-10 shadow-2xl"
      >
        <div className="p-5 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Droplets className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-sm font-black text-on-surface uppercase tracking-wider mb-4">补充水分 (ml)</h3>
          
          <input 
            type="number"
            inputMode="numeric"
            autoFocus
            placeholder="例如: 250"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-center text-3xl font-black text-on-surface bg-transparent border-b-2 border-surface-container-highest focus:border-primary focus:outline-none pb-2 mb-6"
          />

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-surface-container text-on-surface text-xs font-black uppercase tracking-wider transition-colors hover:bg-surface-container-high"
            >
              取消
            </button>
            <button
              onClick={() => {
                const val = parseInt(amount);
                if (!isNaN(val) && val > 0) {
                  onComplete(val);
                }
              }}
              className="flex-1 py-3 rounded-xl bg-primary text-on-primary text-xs font-black uppercase tracking-wider transition-all hover:bg-primary/90 active:scale-95"
            >
              确认
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CalendarModal = ({ 
  selectedDate, 
  onSelect, 
  onClose 
}: { 
  selectedDate: Date; 
  onSelect: (date: Date) => void; 
  onClose: () => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));
  
  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }),
  });

  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-sm rounded-[24px] shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-surface-container flex justify-between items-center bg-surface-container/20">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
            className="p-2 hover:bg-surface-container rounded-full transition-colors text-primary active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h3 className="label-bold uppercase tracking-widest text-primary font-extrabold text-[16px]">
              {format(currentMonth, 'yyyy年 MMMM', { locale: zhCN })}
            </h3>
          </div>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} 
            className="p-2 hover:bg-surface-container rounded-full transition-colors text-primary active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-7 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-center text-[11px] text-on-surface-variant/40 font-black mb-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSelect(day)}
                  className={`
                    aspect-square flex items-center justify-center rounded-xl transition-all text-[14px] font-bold relative
                    ${!isCurrentMonth ? 'text-on-surface-variant/10' : 'text-on-surface hover:bg-surface-container/50'}
                    ${isSelected ? 'bg-primary text-on-primary shadow-lg shadow-primary/30 transform scale-110' : ''}
                  `}
                >
                  {format(day, 'd')}
                  {isToday && !isSelected && (
                    <div className="absolute bottom-1.5 w-1 h-1 bg-primary rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-surface-container/10 border-t border-surface-container flex justify-between gap-3">
          <button 
            onClick={() => onSelect(new Date())} 
            className="px-4 py-2 label-bold text-primary hover:bg-primary/5 rounded-xl border border-primary/20 transition-all font-black text-[12px]"
          >
            回到今天
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 label-bold text-on-surface-variant hover:bg-surface-container rounded-xl transition-all text-[12px]"
          >
            取消
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const FoodDetailPopup = ({ 
  food, 
  onClose, 
  onConfirm 
}: { 
  food: Food; 
  onClose: () => void; 
  onConfirm: (finalFood: Food) => void;
}) => {
  const [inputValue, setInputValue] = useState(food.amount.toString());
  
  const currentAmount = parseFloat(inputValue) || 0;
  const multiplier = currentAmount / (food.amount || 1);
  
  const scaledKcal = ((food.kcal || 0) * multiplier).toFixed(1);
  const scaledP = ((food.p || 0) * multiplier).toFixed(1);
  const scaledC = ((food.c || 0) * multiplier).toFixed(1);
  const scaledF = ((food.f || 0) * multiplier).toFixed(1);

  const handleConfirm = () => {
    onConfirm({
      ...food,
      amount: currentAmount,
      kcal: parseFloat(scaledKcal),
      p: parseFloat(scaledP),
      c: parseFloat(scaledC),
      f: parseFloat(scaledF)
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-outline-variant/30">
          <h3 className="text-lg font-black text-on-surface uppercase tracking-tight">{food.name}</h3>
          <button onClick={onClose} className="p-2 -mr-2 text-on-surface-variant hover:text-primary transition-colors">
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Top Section: Photo & Big Calorie */}
          <div className="p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-surface-container shadow-xl mb-6 ring-4 ring-primary/10">
              <img 
                src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop'} 
                alt={food.name} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="text-center">
              <span className="text-4xl font-black text-[#F44336] leading-none">{scaledKcal}</span>
              <span className="text-xs font-black text-on-surface-variant uppercase tracking-widest block mt-2 opacity-60">总热量 (千卡)</span>
            </div>
          </div>

          {/* Macros Grid */}
          <div className="grid grid-cols-3 gap-3 px-6 mb-8">
            {[
              { label: '碳水', value: scaledC, unit: '克', color: 'bg-emerald-500' },
              { label: '蛋白质', value: scaledP, unit: '克', color: 'bg-amber-500' },
              { label: '脂肪', value: scaledF, unit: '克', color: 'bg-[#F44336]' },
            ].map((macro) => (
              <div key={macro.label} className="bg-surface-container/50 rounded-2xl p-4 flex flex-col items-center border border-outline-variant/10">
                <div className={`w-1.5 h-1.5 rounded-full ${macro.color} mb-2`} />
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">{macro.label}</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-base font-black text-on-surface">{macro.value}</span>
                  <span className="text-[10px] font-bold text-on-surface-variant ml-0.5 opacity-40">{macro.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Amount Input Section */}
          <div className="px-6 pb-10">
            <div className="bg-white border-2 border-primary/20 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black text-on-surface uppercase tracking-widest opacity-60">记录分量</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">
                  基准: {food.amount}{food.unit}
                </span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <input 
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-32 text-center text-4xl font-black text-primary focus:outline-none bg-transparent"
                  placeholder="0"
                  autoFocus
                />
                <span className="text-lg font-black text-on-surface uppercase tracking-widest">{food.unit}</span>
              </div>
              <div className="mt-4 h-1 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary/20 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-outline-variant/30">
          <button 
            onClick={handleConfirm}
            className="w-full bg-primary text-on-primary py-4 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            确认记录
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const FoodLogView = ({ 
  mealName, 
  onBack, 
  onFinish,
  myFoods,
  onAddCustomFood,
  frequentlyUsed
}: { 
  mealName: string; 
  onBack: () => void; 
  onFinish: (foods: Food[]) => void;
  myFoods: Food[];
  onAddCustomFood: () => void;
  frequentlyUsed: Food[];
}) => {
  const [activeSideTab, setActiveSideTab] = useState('frequent');
  const [addedFoods, setAddedFoods] = useState<Food[]>([]);
  const [selectedFoodForDetail, setSelectedFoodForDetail] = useState<Food | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleFood = (food: Food) => {
    setAddedFoods(prev => {
      const exists = prev.find(f => f.id.split('-')[0] === food.id.split('-')[0]);
      if (exists) return prev.filter(f => f.id.split('-')[0] !== food.id.split('-')[0]);
      return [...prev, { ...food, id: `${food.id}-${Date.now()}` }];
    });
  };

  const removeFood = (foodId: string) => {
    setAddedFoods(prev => prev.filter(f => f.id !== foodId));
  };

  const handleConfirmScale = (finalFood: Food) => {
    setAddedFoods(prev => [...prev, { ...finalFood, id: `${finalFood.id}-${Date.now()}` }]);
    setSelectedFoodForDetail(null);
  };

  const renderFoodList = (foods: Food[], title: string, showEmptyState: boolean = false) => {
    if (showEmptyState && foods.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-40">
          <Utensils className="w-12 h-12 mb-4" />
          <p className="text-xs font-black uppercase tracking-widest mb-4">暂无数据</p>
          <button 
            onClick={onAddCustomFood}
            className="px-6 py-2 border-2 border-primary text-primary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-all"
          >
            去添加
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-[12px] font-black text-on-surface-variant uppercase tracking-[0.2em]">{title}</h3>
          {activeSideTab === 'my' && (
            <button 
              onClick={onAddCustomFood}
              className="p-1.5 bg-primary/5 text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {foods.map((food) => {
            const isAdded = addedFoods.find(f => f.id.split('-')[0] === food.id.split('-')[0]);
            return (
              <div 
                key={food.id} 
                onClick={() => setSelectedFoodForDetail(food)}
                className="flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant/10">
                  <img src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop'} alt={food.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[14px] font-black text-on-surface uppercase tracking-tight">{food.name}</span>
                  <span className="text-[11px] font-medium text-on-surface-variant">
                    <span className="text-[#F44336] mr-1">{food.kcal}</span> 
                    千卡/{food.amount.toFixed(2)}{food.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${food.kcal > 300 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  <div 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center transition-all
                      ${isAdded ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}
                    `}
                  >
                    {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-x-0 top-0 bottom-16 bg-white z-[60] flex flex-col">
      <AnimatePresence>
        {selectedFoodForDetail && (
          <FoodDetailPopup 
            food={selectedFoodForDetail} 
            onClose={() => setSelectedFoodForDetail(null)} 
            onConfirm={handleConfirmScale}
          />
        )}
      </AnimatePresence>
      
      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-16 left-0 right-0 bg-white rounded-t-3xl z-[101] shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
            >
              <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between">
                <span className="text-sm font-black text-on-surface uppercase tracking-widest">已选食物 ({addedFoods.length})</span>
                <button onClick={() => setIsCartOpen(false)} className="p-1">
                  <Plus className="w-6 h-6 rotate-45 text-on-surface-variant" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {addedFoods.map((f) => (
                  <div key={f.id} className="flex items-center gap-3">
                    <img src={f.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop'} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 flex flex-col">
                      <span className="text-xs font-black text-on-surface uppercase">{f.name}</span>
                      <span className="text-[10px] text-on-surface-variant font-bold">{f.amount}{f.unit} · {f.kcal}kcal</span>
                    </div>
                    <button 
                      onClick={() => removeFood(f.id)}
                      className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-outline-variant">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-on-surface" />
        </button>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-sm font-black text-on-surface">05月06日 {mealName}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="w-10" />
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <input 
            type="text" 
            placeholder="请输入食物名称" 
            className="w-full bg-white border border-primary/40 rounded-full py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 px-4 mb-4">
        <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container py-2.5 rounded-lg text-[11px] font-black tracking-wider text-primary">
          <Copy className="w-3.5 h-3.5" /> 复制记录
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container py-2.5 rounded-lg text-[11px] font-black tracking-wider text-primary">
          <Zap className="w-3.5 h-3.5" /> 快速记录
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container py-2.5 rounded-lg text-[11px] font-black tracking-wider text-primary">
          <Barcode className="w-3.5 h-3.5" /> 扫条形码
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <aside className="w-20 bg-surface-container border-r border-outline-variant flex flex-col">
          {[
            { id: 'frequent', label: '常用' },
            { id: 'my', label: '我的' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSideTab(tab.id)}
              className={`
                py-5 px-2 text-[10px] font-black tracking-widest relative transition-all
                ${activeSideTab === tab.id ? 'bg-white text-primary' : 'text-on-surface-variant opacity-60'}
              `}
            >
              {activeSideTab === tab.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-r-full" />
              )}
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Food List */}
        <div className="flex-1 overflow-y-auto bg-white p-4">
          {activeSideTab === 'frequent' ? (
            renderFoodList(frequentlyUsed, '常用食物', true)
          ) : (
            renderFoodList(myFoods, '我的记录', true)
          )}
        </div>

        {/* Floating Cart Button */}
        <button 
          onClick={() => addedFoods.length > 0 && setIsCartOpen(true)}
          className={`
            fixed bottom-32 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all z-40
            ${addedFoods.length > 0 ? 'bg-[#FFE082] text-on-surface-variant scale-110' : 'bg-surface-dim/40 text-on-surface-variant opacity-40'}
          `}
        >
          <Utensils className="w-6 h-6" />
          {addedFoods.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#F44336] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
              {addedFoods.length}
            </span>
          )}
        </button>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-white border-t border-outline-variant flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-surface-container rounded-full flex items-center justify-center">
            <Utensils className="w-4 h-4 text-on-surface-variant" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-on-surface uppercase">{mealName}</span>
            <span className="text-[9px] text-on-surface-variant font-bold">已选 {addedFoods.length} 项</span>
          </div>
        </div>
        <button 
          onClick={() => onFinish(addedFoods)}
          className="bg-primary text-on-primary py-3 px-12 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          完成
        </button>
      </footer>
    </div>
  );
};

const AddCustomFoodView = ({ 
  onBack, 
  onComplete 
}: { 
  onBack: () => void; 
  onComplete: (food: Food) => void;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    unit: '',
    kcal: '',
    energyUnit: 'kcal',
    p: '',
    f: '',
    c: '',
    fiber: '',
    sodium: ''
  });
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    if (!formData.name) return;
    const newFood: Food = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      kcal: parseFloat(formData.kcal) || 0,
      unit: formData.unit || '克',
      amount: parseFloat(formData.amount) || 1,
      image: capturedImage || '',
      p: formData.p ? parseFloat(formData.p) : 0,
      f: formData.f ? parseFloat(formData.f) : 0,
      c: formData.c ? parseFloat(formData.c) : 0,
      fiber: formData.fiber ? parseFloat(formData.fiber) : 0,
      sodium: formData.sodium ? parseFloat(formData.sodium) : 0
    };
    onComplete(newFood);
  };

  return (
    <div className="fixed inset-x-0 top-0 bottom-16 bg-[#F8F9FA] z-[70] flex flex-col font-sans text-on-surface">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
      />
      <header className="bg-white flex items-center justify-between px-4 py-3 border-b border-outline-variant/30">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-on-surface-variant" />
        </button>
        <h2 className="text-[16px] font-black text-on-surface">添加自定义食物</h2>
        <button onClick={handleComplete} className="text-[#00BFA5] font-bold text-sm">完成</button>
      </header>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Basic Info */}
        <section className="mt-4 px-4 bg-white border-y border-outline-variant/20 italic-none">
          <div className="py-4">
            <h3 className="text-[12px] font-black text-on-surface-variant uppercase tracking-widest mb-6 px-1">基本信息</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-surface-container-highest py-3">
                <span className="text-sm font-medium text-on-surface">食物名称</span>
                <input 
                  type="text" 
                  placeholder="如：水果沙拉" 
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="grow text-right text-sm placeholder:text-on-surface-variant/30 focus:outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center justify-between border-b border-surface-container-highest py-3">
                <span className="text-sm font-medium text-on-surface">数量</span>
                <div className="flex items-center gap-1">
                  <input 
                    type="text" 
                    inputMode="decimal"
                    placeholder="请输入数值"
                    value={formData.amount}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        setFormData(prev => ({ ...prev, amount: val }));
                      }
                    }}
                    className="text-right text-sm placeholder:text-on-surface-variant/30 focus:outline-none bg-transparent"
                  />
                  <span className="text-sm text-on-surface-variant font-medium">克</span>
                </div>
              </div>


              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-on-surface">热量</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      inputMode="decimal"
                      placeholder="请输入数值"
                      value={formData.kcal}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === '' || /^\d*\.?\d*$/.test(val)) {
                          setFormData(prev => ({ ...prev, kcal: val }));
                        }
                      }}
                      className="w-24 text-right text-sm placeholder:text-on-surface-variant/30 focus:outline-none bg-transparent mr-2"
                    />
                  </div>
                  <div className="flex border border-[#00BFA5]/20 rounded-md overflow-hidden h-7">
                    <button 
                      onClick={() => setFormData(prev => ({ ...prev, energyUnit: 'kcal' }))}
                      className={`px-3 text-[10px] font-bold ${formData.energyUnit === 'kcal' ? 'bg-[#00BFA5] text-white' : 'bg-white text-on-surface-variant/60'}`}
                    >
                      千卡
                    </button>
                    <button 
                      onClick={() => setFormData(prev => ({ ...prev, energyUnit: 'kj' }))}
                      className={`px-3 text-[10px] font-bold ${formData.energyUnit === 'kj' ? 'bg-[#00BFA5] text-white' : 'bg-white text-on-surface-variant/60'}`}
                    >
                      千焦
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Optional Info */}
        <section className="mt-8 px-4 bg-white border-y border-outline-variant/20 focus-within:ring-0">
          <div className="py-4">
            <h3 className="text-[12px] font-black text-on-surface-variant uppercase tracking-widest mb-6 px-1">选填信息</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-surface-container-highest py-4">
                <span className="text-sm font-medium text-on-surface">照片 (可选)</span>
                <button 
                  onClick={handleCameraClick}
                  className="w-10 h-10 bg-surface-container/50 rounded-xl flex items-center justify-center text-on-surface-variant border border-outline-variant/10 overflow-hidden"
                >
                  {capturedImage ? (
                    <img src={capturedImage} className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-5 h-5" />
                  )}
                </button>
              </div>

              {[
                { label: '蛋白质', key: 'p', unit: '克' },
                { label: '脂肪', key: 'f', unit: '克' },
                { label: '碳水化合物', key: 'c', unit: '克' },
                { label: '膳食纤维', key: 'fiber', unit: '克' },
                { label: '钠', key: 'sodium', unit: '毫克' },
              ].map((field) => (
                <div key={field.key} className="flex items-center justify-between border-b border-surface-container-highest py-3">
                  <span className="text-sm font-medium text-on-surface">{field.label}</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      inputMode="decimal"
                      placeholder="请输入数值" 
                      value={formData[field.key as keyof typeof formData]}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === '' || /^\d*\.?\d*$/.test(val)) {
                          setFormData(prev => ({ ...prev, [field.key]: val }));
                        }
                      }}
                      className="text-right text-sm placeholder:text-on-surface-variant/30 focus:outline-none bg-transparent"
                    />
                    <span className="text-sm text-on-surface-variant font-medium min-w-[2rem] text-center">{field.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <p className="mt-8 px-5 text-[10px] text-on-surface-variant/50 font-medium leading-relaxed">
          为了避免饮食数据混乱，自定义食物创建后不可以修改。
        </p>
      </div>
    </div>
  );
};

const NutritionDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [loggedMeals, setLoggedMeals] = useState<Meal[]>([]);
  const [activeLoggingMeal, setActiveLoggingMeal] = useState<Meal | null>(null);

  const [isMealSelectorOpen, setIsMealSelectorOpen] = useState(false);

  const [myFoods, setMyFoods] = useState<Food[]>([]);
  const [frequentlyUsed, setFrequentlyUsed] = useState<Food[]>([]);
  const [isAddingCustomFood, setIsAddingCustomFood] = useState(false);
  const [waterIntake, setWaterIntake] = useState(1200); // Initialize with 1.2L (1200ml)
  const [isWaterInputOpen, setIsWaterInputOpen] = useState(false);

  const handleStartLogging = (mealTemplate: Meal) => {
    setActiveLoggingMeal(mealTemplate);
    setIsMealSelectorOpen(false);
  };

  const handleFinishLogging = (addedFoods: Food[]) => {
    if (!activeLoggingMeal) return;

    if (addedFoods.length > 0) {
      // Add to frequently used, removing duplicates and keeping most recent on top
      setFrequentlyUsed(prev => {
        const unique = [
          ...addedFoods,
          ...prev.filter(pf => !addedFoods.some(af => {
            const baseAfId = af.id.split('-')[0];
            const basePfId = pf.id.split('-')[0];
            return baseAfId === basePfId;
          }))
        ];
        return unique.slice(0, 50); // Limit to 50
      });
    }

    const totalKcal = addedFoods.reduce((acc, f) => acc + f.kcal, 0);
    const totalP = addedFoods.reduce((acc, f) => acc + (f.p || 0), 0);
    const totalC = addedFoods.reduce((acc, f) => acc + (f.c || 0), 0);
    const totalF = addedFoods.reduce((acc, f) => acc + (f.f || 0), 0);

    const newMeal: Meal = {
      ...activeLoggingMeal,
      id: `${activeLoggingMeal.id}-${Date.now()}`,
      kcal: totalKcal,
      p: totalP,
      c: totalC,
      f: totalF,
      status: 'logged' as const,
      loggedAt: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }),
      foods: addedFoods,
      name: addedFoods.length > 0 ? `${activeLoggingMeal.name}` : activeLoggingMeal.name
    };

    setLoggedMeals(prev => [...prev, newMeal]);
    setActiveLoggingMeal(null);
  };

  if (activeLoggingMeal) {
    return (
      <>
        <FoodLogView 
          mealName={activeLoggingMeal.name}
          onBack={() => setActiveLoggingMeal(null)}
          onFinish={handleFinishLogging}
          myFoods={myFoods}
          onAddCustomFood={() => setIsAddingCustomFood(true)}
          frequentlyUsed={frequentlyUsed}
        />
        {isAddingCustomFood && (
          <AddCustomFoodView 
            onBack={() => setIsAddingCustomFood(false)}
            onComplete={(newFood) => {
              setMyFoods(prev => [newFood, ...prev]);
              setIsAddingCustomFood(false);
            }}
          />
        )}
      </>
    );
  }

  const totalP = loggedMeals.reduce((acc, m) => acc + m.p, 0);
  const totalC = loggedMeals.reduce((acc, m) => acc + m.c, 0);
  const totalF = loggedMeals.reduce((acc, m) => acc + m.f, 0);
  const totalKcal = loggedMeals.reduce((acc, m) => acc + m.kcal, 0);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(startOfWeek(selectedDate, { weekStartsOn: 1 }), i);
    return {
      name: format(d, 'eeeeee', { locale: zhCN }),
      date: format(d, 'd'),
      fullDate: d,
      active: isSameDay(d, selectedDate)
    };
  });

  const getDisplayDateLabel = (date: Date) => {
    if (isSameDay(date, new Date())) return '今日';
    if (isSameDay(date, addDays(new Date(), -1))) return '昨日';
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <div className="flex flex-col gap-2.5 px-4 pt-4 pb-24">
      {/* Date Selector */}
      <section className="flex flex-col gap-3 relative">
        <div 
          className="flex items-center gap-1 cursor-pointer group w-fit"
          onClick={() => setIsDatePickerOpen(true)}
        >
          <h1 className="headline-md text-on-surface uppercase">{getDisplayDateLabel(selectedDate)}</h1>
          <motion.div
            animate={{ rotate: isDatePickerOpen ? 180 : 0 }}
          >
            <ChevronDown className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isDatePickerOpen && (
            <CalendarModal 
              selectedDate={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setIsDatePickerOpen(false);
              }}
              onClose={() => setIsDatePickerOpen(false)}
            />
          )}
          {isWaterInputOpen && (
            <WaterInputModal
              onClose={() => setIsWaterInputOpen(false)}
              onComplete={(amount) => {
                setWaterIntake(prev => prev + amount);
                setIsWaterInputOpen(false);
              }}
            />
          )}
        </AnimatePresence>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {days.map((day, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDate(day.fullDate)}
              className={`flex flex-col items-center justify-center min-w-[42px] h-11 rounded-lg transition-all cursor-pointer ${
                day.active 
                  ? 'bg-primary text-on-primary shadow-sm' 
                  : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="text-[8px] uppercase font-black opacity-80 leading-none mb-0.5">{day.name}</span>
              <span className="text-[14px] font-black leading-none">{day.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Integrated Performance Dashboard Card */}
      <section className="bg-white border border-outline-variant/30 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
        {/* Header: Weight & Objective Context */}
        <div className="p-5 border-b border-surface-container flex justify-between items-center bg-gray-50/50">
          <div className="flex flex-col gap-0.5">
            <span className="text-[7.5px] text-on-surface-variant uppercase font-black tracking-[0.1em] opacity-40">
              当前表现状态
            </span>
            <div className="flex items-baseline gap-2">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-black text-on-surface"
              >
                88.0<span className="text-[9px] font-bold ml-1 opacity-25">KG</span>
              </motion.span>
              <span className="text-[8px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded-full tracking-tighter">
                +5KG 增重中
              </span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-0.5">
            <span className="text-[7.5px] text-on-surface-variant uppercase font-black tracking-[0.1em] opacity-40">
              训练协议
            </span>
            <span className="text-[9px] font-black text-on-surface bg-gray-100 px-2 py-0.5 rounded-md border border-outline-variant/10">
              增肌阶段 · 第 12 天
            </span>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {/* Energy & Weight Progress Visualization */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="relative">
                <CalorieGauge remaining={Math.max(0, 2463 - totalKcal)} />
                <div className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm border border-outline-variant/20">
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
              </div>
            </div>

            <div className="w-[1px] h-16 bg-surface-container-highest opacity-50" />

            <div className="flex-1 grid grid-cols-1 gap-3">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[7.5px] text-on-surface-variant uppercase font-black opacity-30 tracking-[0.1em]">摄入</span>
                  <span className="text-base font-black">{totalKcal}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[7.5px] text-on-surface-variant uppercase font-black opacity-30 tracking-[0.1em]">消耗</span>
                  <span className="text-base font-black">320</span>
                </div>
              </div>
              
              {/* Mini Target Gauge */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                   <span className="text-[7.5px] text-on-surface-variant uppercase font-black opacity-30 tracking-[0.1em]">重量目标</span>
                   <span className="text-[8px] font-bold opacity-40">85.0KG</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '85%' }} 
                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(0,88,188,0.2)]" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hydration & Macros Stack */}
          <div className="grid grid-cols-1 gap-4 bg-surface-container/20 p-4 rounded-2xl border border-outline-variant/10">
            {/* Hydration Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-on-surface">饮水量</span>
                  <span className="text-[9px] text-on-surface-variant font-bold opacity-50">{(waterIntake / 1000).toFixed(1)}L / 3.0L</span>
                </div>
              </div>
              <button 
                onClick={() => setIsWaterInputOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                <Plus className="w-3 h-3" /> 补充
              </button>
            </div>

            <div className="w-full h-[1px] bg-surface-container-highest opacity-30" />

            {/* Macros Horizontal Stack */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: '碳水', val: totalC, target: '300g', pct: Math.min(100, (totalC / 300) * 100) },
                { label: '蛋白', val: totalP, target: '180g', pct: Math.min(100, (totalP / 180) * 100) },
                { label: '脂肪', val: totalF, target: '70g', pct: Math.min(100, (totalF / 70) * 100) }
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[8px] font-black text-on-surface-variant opacity-40 tracking-wider font-sans">{m.label}</span>
                    <span className="text-[9px] font-black">{m.val}g</span>
                  </div>
                  <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary/30 rounded-full" style={{ width: `${m.pct}%` }} />
                  </div>
                  <span className="text-[7.5px] text-on-surface-variant/30 font-bold uppercase tracking-wider">目标 {m.target}</span>
                </div>
              ))}
            </div>

            {/* MEAL LOGGING ACTION */}
            <div className="mt-2 border-t border-surface-container-highest pt-4 relative">
              <button 
                onClick={() => setIsMealSelectorOpen(!isMealSelectorOpen)}
                className="w-full py-4 bg-primary text-on-primary rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <Plus className={`w-4 h-4 transition-transform ${isMealSelectorOpen ? 'rotate-45' : ''}`} /> 记录今日饮食
              </button>

              <AnimatePresence>
                {isMealSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute bottom-full left-0 right-0 mb-4 bg-white border border-outline-variant rounded-2xl shadow-2xl z-30 overflow-hidden py-2"
                  >
                    <div className="px-4 py-2 border-b border-surface-container-highest mb-1">
                      <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">请选择餐次</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 px-2">
                      {MEALS.map((meal) => (
                        <button
                          key={meal.id}
                          onClick={() => handleStartLogging(meal)}
                          className="flex flex-col items-start p-3 hover:bg-surface-container rounded-xl transition-colors group/item"
                        >
                          <span className="text-[11px] font-black text-on-surface uppercase group-hover/item:text-primary transition-colors">{meal.name}</span>
                          <span className="text-[8px] text-on-surface-variant font-bold uppercase opacity-50">{meal.timingLabel} · {meal.time}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer: Diagnostic & Action */}
        <div className="px-5 py-4 bg-gray-50 flex justify-between items-center border-t border-surface-container">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(0,88,188,0.5)]" />
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-60">性能引擎：正常运行</span>
          </div>
          <button className="flex items-center gap-2 text-[9px] font-black text-on-surface uppercase tracking-widest hover:text-primary transition-colors opacity-60 hover:opacity-100">
            记录详细数据 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Protein Alert (Now integrated conceptually as the next module) */}
      <section className="bg-error-container/20 border border-error/10 rounded-xl p-3 flex items-start gap-3">
        <CircleAlert className="w-4 h-4 text-error mt-0.5 shrink-0" />
        <div className="flex flex-col">
          <p className="text-[10px] text-error uppercase font-black mb-0.5 tracking-widest">蛋白质警报</p>
          <p className="text-[11px] text-on-surface leading-tight font-medium">
            还差 {Math.max(0, 180 - totalP)}g 达到每日目标。
            <span className="text-on-surface-variant italic block mt-1 opacity-70">建议：在深夜餐中加入1勺乳清蛋白或150g瘦牛肉。</span>
          </p>
        </div>
      </section>

      {/* Meals List */}
      <section className="flex flex-col gap-3">
        <h2 className="label-bold text-on-surface-variant uppercase tracking-wide text-xs">已记录饮食方案</h2>
        <div className="flex flex-col gap-3">
          {loggedMeals.length > 0 ? (
            loggedMeals.map((meal) => (
              <motion.div 
                key={meal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="bg-white border border-outline-variant/40 rounded-xl p-4 flex flex-col gap-3 shadow-sm"
              >
                <div className="flex justify-between items-start pb-2 border-b border-surface-container-highest">
                  <div className="grow">
                    <h3 className="label-bold text-on-surface uppercase">{meal.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="label-sm text-[9px] text-primary uppercase tracking-wide bg-primary/5 px-1.5 py-0.5 rounded-sm w-fit">
                        {meal.timingLabel}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className="label-sm text-on-surface-variant font-bold mt-1 text-[10px]">{meal.loggedAt || meal.time}</span>
                    <CheckCircle className="w-5 h-5 text-primary fill-primary/10" />
                  </div>
                </div>

                {/* Individual Foods Display */}
                {meal.foods && meal.foods.length > 0 && (
                  <div className="flex flex-col gap-2.5 py-1">
                    {meal.foods.map((food, idx) => (
                      <div key={`${meal.id}-food-${idx}`} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container shrink-0 border border-outline-variant/10">
                          <img 
                            src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop'} 
                            alt={food.name} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="text-[11px] font-black text-on-surface uppercase truncate">{food.name}</span>
                            <span className="text-[10px] font-bold text-primary shrink-0">{food.kcal} kcal</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase">{food.amount}{food.unit}</span>
                            <div className="flex items-center gap-1.5 text-[8px] font-bold text-on-surface-variant/40">
                              <span>P: {food.p}g</span>
                              <span className="w-0.5 h-0.5 rounded-full bg-current" />
                              <span>C: {food.c}g</span>
                              <span className="w-0.5 h-0.5 rounded-full bg-current" />
                              <span>F: {food.f}g</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2 py-1">
                  <div className="flex flex-col items-center border-r border-surface-container-highest grow">
                    <span className="label-sm text-[9px] text-on-surface-variant uppercase">蛋白质</span>
                    <span className="label-bold">{meal.p}g</span>
                  </div>
                  <div className="flex flex-col items-center border-r border-surface-container-highest grow">
                    <span className="label-sm text-[9px] text-on-surface-variant uppercase">碳水</span>
                    <span className="label-bold">{meal.c}g</span>
                  </div>
                  <div className="flex flex-col items-center border-r border-surface-container-highest grow">
                    <span className="label-sm text-[9px] text-on-surface-variant uppercase">脂肪</span>
                    <span className="label-bold">{meal.f}g</span>
                  </div>
                  <div className="flex flex-col items-center grow">
                    <span className="label-sm text-[9px] text-on-surface-variant uppercase">千卡</span>
                    <span className="label-bold text-primary">{meal.kcal}</span>
                  </div>
                </div>

                <div className="bg-surface-container/50 border border-outline-variant/20 rounded-lg p-2.5 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="label-sm text-[11px] leading-relaxed text-on-surface-variant">
                    <span className="text-primary font-bold uppercase mr-1">增肌建议:</span> 
                    {meal.tip}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-12 border-2 border-dashed border-outline-variant/20 rounded-3xl flex flex-col items-center justify-center bg-surface-container/5 opacity-50">
              <Utensils className="w-10 h-10 text-on-surface-variant/30 mb-3" />
              <p className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest">尚无饮食记录</p>
              <p className="text-[9px] text-on-surface-variant/60 uppercase font-bold mt-1">点击上方按钮开始规划今日能量</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const WorkoutTrack = () => {
  const [selectedPlan, setSelectedPlan] = useState('零基础入门方案');
  const [isPlanSelectorOpen, setIsPlanSelectorOpen] = useState(false);

  const workouts = WORKOUT_PLANS[selectedPlan] || WORKOUT_PLANS['零基础入门方案'];

  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-32">
      <header className="flex flex-col gap-2">
        <div className="relative">
          <div 
            onClick={() => setIsPlanSelectorOpen(!isPlanSelectorOpen)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-1 h-3 bg-primary rounded-full" />
            <h1 className="text-[20px] font-black text-on-surface tracking-tight uppercase">{selectedPlan}</h1>
            <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isPlanSelectorOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isPlanSelectorOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-56 bg-white border border-outline-variant rounded-2xl shadow-xl z-30 py-2"
              >
                {Object.keys(WORKOUT_PLANS).map((plan) => (
                  <button
                    key={plan}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsPlanSelectorOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider hover:bg-surface-container transition-colors flex items-center justify-between ${selectedPlan === plan ? 'text-primary' : 'text-on-surface-variant'}`}
                  >
                    {plan}
                    {selectedPlan === plan && <CheckCircle className="w-4 h-4" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-[12px] text-on-surface-variant font-medium leading-relaxed opacity-70">
          {selectedPlan === '零基础入门方案' ? '基础构建计划。经典的5天分部训练，专注于复合动作和渐进性负荷架构。' : 
           selectedPlan === '推拉计划' ? '进阶高频系统。推、拉、腿部的循环架构，最大化合成代谢窗口与恢复效率。' :
           selectedPlan === '三分化计划' ? '经典健美分化。针对性肌群组合，均衡的强度与容量分配。' :
           '深度分化协议。极高容量的单部位打击，职业级精雕细琢架构。'}
        </p>
      </header>

      {/* Protocol Progress Card */}
      <div className="bg-white border border-outline-variant/30 rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="flex flex-col">
            <span className="text-[7.5px] text-on-surface-variant uppercase font-black tracking-widest opacity-40 mb-0.5">协议总进度</span>
            <span className="text-2xl font-black text-on-surface tabular-nums">12<span className="text-xs ml-0.5 opacity-20">%</span></span>
          </div>
          <div className="flex-grow flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-tighter text-on-surface-variant opacity-60">
               <span>已完成 3 / 24 节</span>
               <span className="text-primary font-bold">运行中</span>
            </div>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '12%' }}
                className="h-full bg-primary shadow-[0_0_10px_rgba(0,88,188,0.3)]"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-2 opacity-[0.03] pointer-events-none">
          <Activity className="w-24 h-24 stroke-[4]" />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40 ml-1">本周训练计划</h3>
        {workouts.map((day) => (
          <article 
            key={day.id} 
            className="group bg-white border border-outline-variant/30 rounded-[2rem] p-5 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-[11px] font-black text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    {day.id.split(' ')[1] || day.id}
                  </span>
                  <h2 className="text-lg font-black text-on-surface uppercase tracking-tight">{day.title}</h2>
                </div>
                <div className="flex gap-2 mt-1">
                   <span className="text-[9px] font-black text-on-surface-variant/60 uppercase border border-outline-variant/30 px-2 py-0.5 rounded-md">
                     {day.exercises.length} 个动作
                   </span>
                   <span className="text-[9px] font-black text-primary/80 uppercase bg-primary/5 px-2 py-0.5 rounded-md">
                     中等强度
                   </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center text-on-surface-variant group-hover:scale-110 transition-transform duration-500">
                {day.icon}
              </div>
            </div>

            <div className="flex flex-col gap-3 bg-surface-container/20 p-4 rounded-2xl border border-outline-variant/10">
              {day.exercises.map((ex, i) => (
                <div key={i} className="flex justify-between items-center opacity-80">
                  <span className="text-[11px] font-bold text-on-surface uppercase tracking-tight">{ex.name}</span>
                  <span className="text-[10px] font-black text-on-surface-variant tabular-nums">{ex.sets}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-on-surface text-surface text-[11px] font-black py-4 rounded-2xl uppercase tracking-[0.15em] hover:bg-primary transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-95 group">
              进入训练单元 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('nutrition');

  return (
    <div className="min-h-screen bg-surface selection:bg-primary selection:text-on-primary font-sans text-on-surface antialiased overflow-x-hidden">
      <TopAppBar activeTab={activeTab} />
      
      <main className="max-w-md mx-auto relative min-h-[calc(100vh-112px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && (
              <div className="flex flex-col gap-6 px-6 pt-8 pb-32">
                <header className="flex flex-col gap-0.5">
                  <h2 className="text-xl font-black text-on-surface tracking-tight uppercase">竞技概览</h2>
                  <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.15em] opacity-30">第 12 天 / 动态协议</p>
                </header>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary p-5 rounded-[2rem] text-on-primary flex flex-col gap-3 shadow-lg shadow-primary/10">
                    <div className="flex justify-between items-start">
                      <Zap className="w-4 h-4 fill-on-primary" />
                      <span className="text-[7.5px] font-black uppercase tracking-[0.1em] opacity-50">活跃等级</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-black">LVL 4</span>
                      <span className="text-[8.5px] font-bold opacity-40 uppercase tracking-tighter">下一级 240XP</span>
                    </div>
                  </div>
                  <div className="bg-white border border-outline-variant/20 p-5 rounded-[2rem] flex flex-col gap-3 shadow-sm">
                    <div className="flex justify-between items-start text-primary">
                      <Target className="w-4 h-4" />
                      <span className="text-[7.5px] font-black uppercase tracking-[0.1em] text-on-surface-variant opacity-30">目标偏离</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-on-surface">0.4%</span>
                      <span className="text-[8.5px] font-bold text-on-surface-variant opacity-30 uppercase tracking-tighter">高精度运行</span>
                    </div>
                  </div>
                </div>

                {/* Daily Highlight Card */}
                <div className="bg-surface-container/30 border border-outline-variant/10 rounded-[2.5rem] p-6 flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[9px] font-black text-on-surface uppercase tracking-[0.15em] opacity-30">今日核心指标</h3>
                    <button onClick={() => setActiveTab('nutrition')} className="text-[9px] font-black text-primary uppercase opacity-60 hover:opacity-100 transition-opacity font-bold">详情</button>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                         <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-surface-container-highest opacity-50" />
                         <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="175" strokeDashoffset="140" className="text-primary" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[11px] font-black">20%</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 grow">
                      <div className="flex justify-between items-end">
                        <span className="text-[9px] font-black opacity-30 uppercase tracking-wider text-on-surface-variant">当日摄入</span>
                        <span className="text-[10px] font-black opacity-70">420 / 2850 <span className="text-[8px] opacity-40">KCAL</span></span>
                      </div>
                      <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[20%] rounded-full shadow-[0_0_8px_rgba(0,88,188,0.2)]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Session Preview */}
                <div className="relative group cursor-pointer" onClick={() => setActiveTab('workout')}>
                  <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-white border border-outline-variant/20 rounded-[2rem] p-5 flex items-center gap-4 relative z-10 transition-all group-hover:shadow-lg group-hover:border-primary/10">
                     <div className="w-12 h-12 bg-surface-container/50 rounded-2xl flex items-center justify-center text-primary/80">
                       <Dumbbell className="w-6 h-6" />
                     </div>
                     <div className="flex flex-col grow">
                       <span className="text-[8px] font-black text-on-surface-variant uppercase tracking-[0.1em] opacity-40 mb-0.5">下一场训练单元</span>
                       <span className="text-base font-black text-on-surface uppercase tracking-tight">卧推 & 胸部肌群</span>
                       <div className="flex items-center gap-2 mt-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                         <span className="text-[9px] font-bold text-primary opacity-60 uppercase">建议：1 小时后</span>
                       </div>
                     </div>
                     <ChevronRight className="w-4 h-4 text-on-surface-variant opacity-20" />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'workout' && <WorkoutTrack />}
            {activeTab === 'nutrition' && <NutritionDashboard />}
            {activeTab === 'profile' && (
              <div className="p-4 flex flex-col gap-6">
                 <div className="flex items-center gap-4 py-4 border-b border-surface-container-highest font-sans">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black uppercase text-on-surface">王小明</h2>
                      <p className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest opacity-40">精英选手 Lvl 4</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container/30 border border-outline-variant/10 rounded-2xl p-4">
                       <p className="text-[8px] uppercase text-on-surface-variant font-black mb-1 opacity-40 tracking-wider">体重</p>
                       <p className="text-xl font-black">88.5 <span className="text-[10px] text-on-surface-variant font-bold opacity-30">KG</span></p>
                    </div>
                    <div className="bg-surface-container/30 border border-outline-variant/10 rounded-2xl p-4">
                       <p className="text-[8px] uppercase text-on-surface-variant font-black mb-1 opacity-40 tracking-wider">身高</p>
                       <p className="text-xl font-black">185 <span className="text-[10px] text-on-surface-variant font-bold opacity-30">CM</span></p>
                    </div>
                 </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

