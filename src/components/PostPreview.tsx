import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostPreviewProps {
  content: string;
  hashtags: string[];
  template: string;
  platform: string;
}

export const PostPreview = ({ content, hashtags, template, platform }: PostPreviewProps) => {
  const formatContent = () => {
    if (!content.trim() && hashtags.length === 0) {
      return "Your post preview will appear here...";
    }
    
    const hashtagString = hashtags.length > 0 ? `\n\n${hashtags.map(tag => `#${tag}`).join(' ')}` : '';
    return content + hashtagString;
  };

  const getPlatformStyles = () => {
    switch (platform) {
      case 'instagram':
        return {
          bgColor: 'bg-gradient-to-br from-purple-400 to-pink-400',
          accentColor: 'text-pink-600',
          borderColor: 'border-pink-200'
        };
      case 'twitter':
        return {
          bgColor: 'bg-gradient-to-br from-blue-400 to-blue-500',
          accentColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        };
      case 'linkedin':
        return {
          bgColor: 'bg-gradient-to-br from-blue-600 to-blue-700',
          accentColor: 'text-blue-700',
          borderColor: 'border-blue-300'
        };
      case 'facebook':
        return {
          bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
          accentColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        };
      case 'tiktok':
        return {
          bgColor: 'bg-gradient-to-br from-black to-gray-800',
          accentColor: 'text-red-600',
          borderColor: 'border-gray-300'
        };
      default:
        return {
          bgColor: 'bg-gradient-to-br from-purple-400 to-pink-400',
          accentColor: 'text-purple-600',
          borderColor: 'border-purple-200'
        };
    }
  };

  const styles = getPlatformStyles();

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${styles.bgColor}`}></div>
          {platform.charAt(0).toUpperCase() + platform.slice(1)} Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mock Social Media Post */}
        <div className={`border ${styles.borderColor} rounded-lg overflow-hidden post-preview`}>
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>YP</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-sm">Your Profile</div>
                <div className="text-xs text-muted-foreground">2 minutes ago</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4">
            {template === 'image' && (
              <div className="mb-4">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                      📸
                    </div>
                    <div className="text-sm">Your image here</div>
                  </div>
                </div>
              </div>
            )}

            {template === 'carousel' && (
              <div className="mb-4">
                <div className="flex gap-2 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                      Slide {i}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {formatContent()}
            </div>
          </div>

          {/* Engagement */}
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Heart className={`w-5 h-5 ${styles.accentColor}`} />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Share className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>

          <div className="px-4 pb-3 text-xs text-muted-foreground">
            1,234 likes • 56 comments
          </div>
        </div>

        {/* Template Info */}
        <div className="mt-4 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Template: {template}
          </Badge>
          <Badge variant="outline" className={`text-xs ${styles.accentColor} border-current`}>
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};