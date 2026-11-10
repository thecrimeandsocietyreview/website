import React from 'react';
import { ArticleReaderLayout } from '../components/article/ArticleReaderLayout';
import { getArticleBySlug } from '../data/articlesData';

export const ArticlePrisonAdvocacyPage: React.FC = () => {
  const article = getArticleBySlug('walls-closing-in-prison-advocacy');
  return <ArticleReaderLayout article={article} />;
};

export default ArticlePrisonAdvocacyPage;

