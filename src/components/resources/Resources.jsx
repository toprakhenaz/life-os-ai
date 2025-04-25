import React from 'react';
import ResourceSection from './ResourceSection';

const Resources = () => {
  // Resource data
  const influenceResources = [
    {
      title: 'Essential Readings',
      type: 'book',
      items: [
        'How to Win Friends and Influence People - Dale Carnegie',
        'Influence: The Psychology of Persuasion - Robert Cialdini',
        'Never Split the Difference - Chris Voss'
      ]
    },
    {
      title: 'Practice Exercises',
      type: 'practice',
      items: [
        'Mirror technique: Practice repeating the last few words someone says in conversation form',
        'Labeling emotions: Practice identifying someone\'s emotions ("It seems like you\'re frustrated")',
        'Social proof collection: Document instances where you successfully influenced others'
      ]
    },
    {
      title: 'Advanced Resources',
      type: 'course',
      items: [
        'Eric Berne\'s Transactional Analysis in Psychotherapy',
        'Daniel Kahneman\'s Thinking, Fast and Slow (cognitive biases)'
      ]
    }
  ];
  
  const wealthResources = [
    {
      title: 'Financial Foundations',
      type: 'book',
      items: [
        'Rich Dad Poor Dad - Robert Kiyosaki',
        'The Psychology of Money - Morgan Housel',
        'I Will Teach You to Be Rich - Ramit Sethi'
      ]
    },
    {
      title: 'Daily Wealth Actions',
      type: 'practice',
      items: [
        'Track every expense without judgment (build financial awareness)',
        'Read one finance article daily (compound knowledge)',
        'Network with one person weekly in your desired field'
      ]
    },
    {
      title: 'Technical Skill Development',
      type: 'code',
      items: [
        'Problem-solving skills on LeetCode/HackerRank (marketable skills)',
        'AI/ML specialization courses (high-value expertise)'
      ]
    }
  ];
  
  return (
    <div className="space-y-6">
      <ResourceSection 
        title="Influence Mastery Resources" 
        categories={influenceResources} 
      />
      
      <ResourceSection 
        title="Wealth Building Resources" 
        categories={wealthResources} 
      />
    </div>
  );
};

export default Resources;