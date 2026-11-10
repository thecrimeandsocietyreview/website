import React from 'react';
import { ArticleReaderLayout } from '../components/article/ArticleReaderLayout';
import { getArticleBySlug } from '../data/articlesData';

export const ArticleMissingWomenPage: React.FC = () => {
  const article = getArticleBySlug('missing-murdered-marginalized-racial-disparities');
  return <ArticleReaderLayout article={article} />;
};

export default ArticleMissingWomenPage;

