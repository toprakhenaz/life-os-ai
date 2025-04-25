import { 
  Users, TrendingUp, BookOpen, MessageSquare, Code, Award, Calendar, 
  Brain, Battery, AlertCircle, Zap, Loader, BarChart, Download, 
  FileText, PieChart, LineChart, ActivitySquare, ArrowUpRight 
} from 'lucide-react';
import React from 'react';


const iconComponents = {
  Users,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Code,
  Award,
  Calendar,
  Brain,
  Battery,
  AlertCircle,
  Zap,
  Loader,
  BarChart,
  Download,
  FileText,
  PieChart,
  LineChart,
  ActivitySquare,
  ArrowUpRight
};

export const renderIcon = (iconName, size = 20) => {
  const IconComponent = iconComponents[iconName] || Calendar;
  // JSX kullanmak yerine createElement kullanın
  return React.createElement(IconComponent, { size: size });
};

export default iconComponents;