import { useParams } from 'react-router-dom';
import { SeoLandingLayout } from '@/components/seo';
import { SEO_CLUSTERS } from './clusters';
import NotFound from '@/pages/NotFound';

export default function SeoClusterPage() {
  const { slug } = useParams<{ slug: string }>();
  const cluster = SEO_CLUSTERS.find((c) => c.slug === slug);
  if (!cluster) return <NotFound />;
  return (
    <SeoLandingLayout
      title={cluster.title}
      description={cluster.description}
      h1={cluster.h1}
      lede={cluster.lede}
      sections={cluster.sections}
      quickAnswer={cluster.quickAnswer}
      topic={cluster.topic}
      extraFaqs={cluster.extraFaqs}
      canonicalPath={`/${cluster.slug}`}
    />
  );
}
