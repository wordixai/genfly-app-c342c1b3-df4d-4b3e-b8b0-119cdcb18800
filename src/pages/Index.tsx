import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Hash, Copy, Download, Shuffle, RefreshCw } from 'lucide-react';
import { PostPreview } from '@/components/PostPreview';
import { TemplateSelector } from '@/components/TemplateSelector';
import { HashtagSuggestions } from '@/components/HashtagSuggestions';
import { usePostGenerator } from '@/hooks/usePostGenerator';

const Index = () => {
  const {
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
  } = usePostGenerator();

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Social Post Generator Pro
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create engaging social media posts with AI-powered content and trending hashtags
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content Creator */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Post Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Platform & Category Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Platform</label>
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="food">Food & Cooking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Template Selection */}
                <TemplateSelector 
                  selectedTemplate={selectedTemplate}
                  onTemplateChange={setSelectedTemplate}
                  platform={selectedPlatform}
                />

                {/* Content Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Content</label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={generateContent}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Shuffle className="w-4 h-4" />
                      )}
                      Generate
                    </Button>
                  </div>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content or click Generate for AI suggestions..."
                    className="min-h-[120px] resize-none"
                  />
                </div>

                {/* Hashtag Management */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium">Hashtags</label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={generateHashtags}
                      disabled={isGenerating}
                    >
                      <Hash className="w-4 h-4" />
                      Generate Tags
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[40px] p-2 border rounded-lg bg-muted/50">
                    {hashtags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => removeHashtag(tag)}
                      >
                        #{tag} ×
                      </Badge>
                    ))}
                    {hashtags.length === 0 && (
                      <span className="text-muted-foreground text-sm">No hashtags added yet</span>
                    )}
                  </div>

                  <HashtagSuggestions 
                    category={selectedCategory}
                    onHashtagAdd={addHashtag}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            <PostPreview 
              content={content}
              hashtags={hashtags}
              template={selectedTemplate}
              platform={selectedPlatform}
            />

            {/* Action Buttons */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={copyToClipboard}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12"
                    disabled={!content.trim()}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Post
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={downloadPost}
                    className="h-12 border-2"
                    disabled={!content.trim()}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analytics & Tips */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Tabs defaultValue="analytics" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="tips">Tips</TabsTrigger>
                  </TabsList>
                  <TabsContent value="analytics" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600">
                          {content.length}
                        </div>
                        <div className="text-sm text-purple-600">Characters</div>
                      </div>
                      <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                        <div className="text-2xl font-bold text-pink-600">
                          {hashtags.length}
                        </div>
                        <div className="text-sm text-pink-600">Hashtags</div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="tips" className="mt-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Use 5-10 relevant hashtags for optimal reach</p>
                      <p>• Keep content engaging and authentic</p>
                      <p>• Post during peak engagement hours</p>
                      <p>• Include a clear call-to-action</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;