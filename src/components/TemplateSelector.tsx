import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Image, RotateCcw, Type, Video, Grid3X3 } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  platform: string;
}

export const TemplateSelector = ({ selectedTemplate, onTemplateChange, platform }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'text',
      name: 'Text Only',
      icon: Type,
      description: 'Simple text post',
      platforms: ['twitter', 'facebook', 'linkedin']
    },
    {
      id: 'image',
      name: 'Single Image',
      icon: Image,
      description: 'Post with one image',
      platforms: ['instagram', 'facebook', 'twitter', 'linkedin']
    },
    {
      id: 'carousel',
      name: 'Carousel',
      icon: Grid3X3,
      description: 'Multiple images',
      platforms: ['instagram', 'facebook', 'linkedin']
    },
    {
      id: 'video',
      name: 'Video',
      icon: Video,
      description: 'Video content',
      platforms: ['instagram', 'tiktok', 'facebook', 'twitter']
    },
    {
      id: 'story',
      name: 'Story',
      icon: RotateCcw,
      description: 'Vertical story format',
      platforms: ['instagram', 'facebook']
    }
  ];

  const availableTemplates = templates.filter(template => 
    !platform || template.platforms.includes(platform)
  );

  return (
    <div>
      <label className="text-sm font-medium mb-3 block">Post Template</label>
      <div className="grid grid-cols-2 gap-3">
        {availableTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card
              key={template.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md border-2",
                selectedTemplate === template.id
                  ? "border-purple-500 bg-purple-50 shadow-lg"
                  : "border-gray-200 hover:border-purple-300"
              )}
              onClick={() => onTemplateChange(template.id)}
            >
              <CardContent className="p-4 text-center">
                <Icon className={cn(
                  "w-8 h-8 mx-auto mb-2",
                  selectedTemplate === template.id ? "text-purple-600" : "text-gray-400"
                )} />
                <div className="font-medium text-sm mb-1">{template.name}</div>
                <div className="text-xs text-muted-foreground">{template.description}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};