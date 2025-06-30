import { NumberTicker } from "../magicui/number-ticker";

export default function StatsSection() {
  const stats = [
    {
      number: (
        <div className="flex flex-row items-end">
          <NumberTicker
            value={3}
            className="whitespace-pre-wrap text-8xl tracking-tighter text-black dark:text-white"
          />
          <span className="text-black dark:text-white text-8xl">+</span>
        </div>
      ),
      label: "Years of research",
    },
    {
      number: (
        <div className="flex flex-row items-end">
          <NumberTicker
            value={50}
            className="whitespace-pre-wrap text-8xl tracking-tighter text-black dark:text-white"
          />
          <span className="text-black dark:text-white text-8xl">K+</span>
        </div>
      ),
      label: "Ingredients analyzed",
    },
    {
      number: (
        <div className="flex flex-row items-end">
          <NumberTicker
            value={1.2}
            className="whitespace-pre-wrap text-8xl tracking-tighter text-black dark:text-white"
          />
          <span className="text-black dark:text-white text-8xl">K+</span>
        </div>
      ),
      label: "User reviews",
    },
    {
      number: (
        <div className="whitespace-pre-wrap text-8xl tracking-tighter text-black dark:text-white">
          24/7
        </div>
      ),
      label: "AI assistance",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              {stat.number}
              <div className="text-gray-600 text-xs lg:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
