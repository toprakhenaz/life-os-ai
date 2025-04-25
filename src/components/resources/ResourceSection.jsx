import React from 'react';
import { BookOpen, MessageSquare, Code } from 'lucide-react';

const ResourceSection = ({ title, categories }) => {
  // Helper function to render icon by type
  const renderCategoryIcon = (type, size = 16) => {
    switch (type) {
      case 'book':
        return <BookOpen size={size} className="mr-2 text-blue-500" />;
      case 'course':
        return <MessageSquare size={size} className="mr-2 text-purple-500" />;
      case 'practice':
        return <div className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2 mt-1" />;
      case 'code':
        return <Code size={size} className="mr-2 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={categoryIndex < categories.length - 1 ? "border-b pb-3" : ""}>
            <h3 className="font-medium">{category.title}</h3>
            <ul className="mt-2 space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  {renderCategoryIcon(category.type, 16)}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceSection;