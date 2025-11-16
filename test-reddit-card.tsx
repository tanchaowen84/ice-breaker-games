import { RedditCard } from '@/components/shared/reddit-card';

export default function TestRedditCard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Reddit Card Test</h1>

        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Reddit Card</h2>
            <RedditCard url="https://www.reddit.com/r/Theatre/comments/1exgtwq/best_warmup_games/" />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Different Subreddit</h2>
            <RedditCard url="https://www.reddit.com/r/improv/comments/doqzjw/advanced_zip_zap_zop/" />
          </div>
        </div>
      </div>
    </div>
  );
}