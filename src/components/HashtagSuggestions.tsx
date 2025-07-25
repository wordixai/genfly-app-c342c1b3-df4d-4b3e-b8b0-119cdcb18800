import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HashtagSuggestionsProps {
  category: string;
  onHashtagAdd: (hashtag: string) => void;
}

export const HashtagSuggestions = ({ category, onHashtagAdd }: HashtagSuggestionsProps) => {
  const hashtagSuggestions = {
    business: {
      trending: ['entrepreneur', 'startup', 'business', 'success', 'motivation'],
      popular: ['businesstips', 'marketing', 'leadership', 'innovation', 'growth'],
      niche: ['b2b', 'networking', 'productivity', 'strategy', 'mindset']
    },
    lifestyle: {
      trending: ['lifestyle', 'selfcare', 'wellness', 'mindfulness', 'balance'],
      popular: ['inspiration', 'positivity', 'happiness', 'goals', 'gratitude'],
      niche: ['minimalism', 'sustainability', 'healthyhabits', 'selflove', 'journaling']
    },
    technology: {
      trending: ['tech', 'ai', 'innovation', 'digital', 'future'],
      popular: ['coding', 'programming', 'software', 'development', 'startup'],
      niche: ['machinelearning', 'blockchain', 'cybersecurity', 'iot', 'cloudcomputing']
    },
    fitness: {
      trending: ['fitness', 'workout', 'health', 'gym', 'motivation'],
      popular: ['fitnessmotivation', 'healthylifestyle', 'training', 'exercise', 'strength'],
      niche: ['bodybuilding', 'crossfit', 'yoga', 'running', 'nutrition']
    },
    food: {
      trending: ['food', 'cooking', 'recipe', 'delicious', 'foodie'],
      popular: ['homecooking', 'healthy', 'yummy', 'chef', 'kitchen'],
      niche: ['vegan', 'glutenfree', 'baking', 'mealprep', 'organic']
    }
  };

  const currentSuggestions = hashtagSuggestions[category as keyof typeof hashtagSuggestions] || hashtagSuggestions.business;

  return (
    <div>
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="trending" className="text-xs">🔥 Trending</TabsTrigger>
          <TabsTrigger value="popular" className="text-xs">⭐ Popular</TabsTrigger>
          <TabsTrigger value="niche" className="text-xs">🎯 Niche</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-24">
          <TabsContent value="trending" className="mt-0">
            <div className="flex flex-wrap gap-2">
              {currentSuggestions.trending.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-orange-100 hover:border-orange-400 hover:text-orange-600 transition-colors"
                  onClick={() => onHashtagAdd(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-0">
            <div className="flex flex-wrap gap-2">
              {currentSuggestions.popular.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  onClick={() => onHashtagAdd(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="niche" className="mt-0">
            <div className="flex flex-wrap gap-2">
              {currentSuggestions.niche.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-100 hover:border-purple-400 hover:text-purple-600 transition-colors"
                  onClick={() => onHashtagAdd(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};