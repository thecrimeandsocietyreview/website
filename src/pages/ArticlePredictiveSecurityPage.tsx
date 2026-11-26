import React from 'react';
import { ArticleReaderLayout } from '../components/article/ArticleReaderLayout';
import { getArticleBySlug } from '../data/articlesData';

export const ArticlePredictiveSecurityPage: React.FC = () => {
  const article = getArticleBySlug('ai-predictive-security-critical-infrastructure-eu');
  return <ArticleReaderLayout article={article} />;
};

export default ArticlePredictiveSecurityPage;
