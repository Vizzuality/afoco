import Markdown from 'react-markdown';

export function DescriptionWithoutMarkdown({ description = '' }) {
  const cleanedDescription = description?.replace(/\[\^\d+\]/g, '');

  return (
    <Markdown disallowedElements={['a', 'em', 'strong']} unwrapDisallowed>
      {cleanedDescription}
    </Markdown>
  );
}
