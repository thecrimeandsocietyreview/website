import React from 'react';
import { ArticleReaderLayout } from '../components/article/ArticleReaderLayout';
import { getArticleBySlug } from '../data/articlesData';

export const ArticleBiodiversityLossPage: React.FC = () => {
  const article = getArticleBySlug('waging-war-against-biodiversity-loss-indonesia');
  return <ArticleReaderLayout article={article} />;
};

export default ArticleBiodiversityLossPage;

