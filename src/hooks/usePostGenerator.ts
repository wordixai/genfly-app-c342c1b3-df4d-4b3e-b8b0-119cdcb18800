import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePostGenerator = () => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('image');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [selectedCategory, setSelectedCategory] = useState('business');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTemplates = {
    business: [
      "💡 Success isn't just about what you accomplish in your life, it's about what you inspire others to do. What's your biggest goal this week?",
      "🚀 The difference between ordinary and extraordinary is that little 'extra'. What extra effort are you putting in today?",
      "📈 Your network is your net worth. Who are you connecting with in your industry?",
      "⚡ Innovation distinguishes between a leader and a follower. How are you innovating in your field?",
      "🎯 Focus on progress, not perfection. What small step are you taking today?"
    ],
    lifestyle: [
      "🌅 Morning routines set the tone for your entire day. What's the first thing you do when you wake up?",
      "☕ Sometimes the most productive thing you can do is relax. How do you unwind?",
      "✨ Self-care isn't selfish, it's essential. What's your favorite way to practice self-care?",
      "🌱 Growth happens outside your comfort zone. What's challenging you right now?",
      "🧘‍♀️ Mindfulness is about being present. What moment today brought you joy?"
    ],
    technology: [
      "🤖 AI is transforming how we work, learn, and create. What's the most exciting AI development you've seen recently?",
      "💻 The future belongs to those who learn to code. What programming language are you curious about?",
      "🔧 Technology is best when it brings people together. How has tech improved your connections?",
      "⚡ Innovation is seeing what others see but thinking what others haven't thought. What's your next big idea?",
      "🌐 Digital transformation isn't just about technology—it's about reimagining possibilities."
    ],
    fitness: [
      "💪 Your body can do what your mind believes it can. What fitness goal are you working towards?",
      "🏃‍♀️ Every workout is progress, no matter how small. What movement made you feel strong today?",
      "🥗 Nutrition is about nourishing your body, not punishing it. What healthy meal energized you?",
      "⏰ Consistency beats perfection every time. What healthy habit are you building?",
      "🧘‍♂️ Mental fitness is just as important as physical fitness. How do you train your mind?"
    ],
    food: [
      "👨‍🍳 Cooking is love made visible. What dish reminds you of home?",
      "🌱 Fresh ingredients make all the difference. What's your favorite seasonal produce right now?",
      "🍽️ Food brings people together like nothing else. What's your favorite meal to share?",
      "📖 Every recipe tells a story. What's the story behind your signature dish?",
      "🌶️ Life's too short for bland food. What spice or flavor excites your taste buds?"
    ]
  };

  const hashtagSets = {
    business: ['entrepreneur', 'business', 'success', 'motivation', 'leadership', 'startup', 'growth'],
    lifestyle: ['lifestyle', 'selfcare', 'wellness', 'mindfulness', 'inspiration', 'balance', 'happiness'],
    technology: ['tech', 'innovation', 'ai', 'coding', 'digital', 'future', 'startup'],
    fitness: ['fitness', 'health', 'workout', 'motivation', 'strength', 'wellness', 'gym'],
    food: ['food', 'cooking', 'recipe', 'foodie', 'delicious', 'homemade', 'chef']
  };

  const addHashtag = (hashtag: string) => {
    if (!hashtags.includes(hashtag) && hashtags.length < 10) {
      setHashtags([...hashtags, hashtag]);
    }
  };

  const removeHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter(tag => tag !== hashtag));
  };

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const templates = contentTemplates[selectedCategory as keyof typeof contentTemplates] || contentTemplates.business;
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setContent(randomTemplate);
      
      toast({
        title: "Content Generated!",
        description: "Fresh content has been generated for your post.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateHashtags = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const availableTags = hashtagSets[selectedCategory as keyof typeof hashtagSets] || hashtagSets.business;
      const newHashtags = [...hashtags];
      
      // Add 3-5 random hashtags that aren't already included
      const tagsToAdd = availableTags
        .filter(tag => !newHashtags.includes(tag))
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(3 + Math.floor(Math.random() * 3), 10 - newHashtags.length));
      
      setHashtags([...newHashtags, ...tagsToAdd]);
      
      toast({
        title: "Hashtags Generated!",
        description: `Added ${tagsToAdd.length} trending hashtags to your post.`,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    const fullPost = content + (hashtags.length > 0 ? `\n\n${hashtags.map(tag => `#${tag}`).join(' ')}` : '');
    
    try {
      await navigator.clipboard.writeText(fullPost);
      toast({
        title: "Copied!",
        description: "Post content copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadPost = () => {
    const fullPost = content + (hashtags.length > 0 ? `\n\n${hashtags.map(tag => `#${tag}`).join(' ')}` : '');
    const blob = new Blob([fullPost], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `social-post-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Post saved as text file.",
    });
  };

  return {
    content,
    setContent,
    selectedTemplate,
    setSelectedTemplate,
    selectedPlatform,
    setSelectedPlatform,
    selectedCategory,
    setSelectedCategory,
    hashtags,
    addHashtag,
    removeHashtag,
    generateContent,
    generateHashtags,
    isGenerating,
    copyToClipboard,
    downloadPost
  };
};