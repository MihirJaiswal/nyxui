import { AnimatedCodeBlock } from "../ui/animated-code-block";

export const AnimatedCodeBlockDemo = () => {
  const examples = [
    {
      code: `import { useState, useEffect } from 'react';
      
function useDataFetching(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData);
  }, [url]);
  return data;
}`,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-md overflow-hidden relative">
      <AnimatedCodeBlock
        code={examples[0].code}
        theme="terminal"
        title="FetchData.tsx"
        typingSpeed={50}
        showLineNumbers={true}
        autoPlay={true}
        highlightLines={[1, 4, 10]}
        loop={true}
      />
    </div>
  );
};
