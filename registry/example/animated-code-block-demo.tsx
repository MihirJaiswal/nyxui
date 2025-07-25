import { AnimatedCodeBlock } from "../ui/animated-code-block";

export const AnimatedCodeBlockDemo = () => {
  const examples = [
    {
      code: `import { useState, useEffect } from 'react';

function useDataFetching(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}
`,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-md overflow-hidden relative">
      <AnimatedCodeBlock
        code={examples[0].code}
        theme="dark"
        title="fetch-data.jsx"
        typingSpeed={50}
        showLineNumbers={true}
        autoPlay={true}
        language="typescript"
        highlightLines={[1, 4, 10]}
        loop={true}
      />
    </div>
  );
};
