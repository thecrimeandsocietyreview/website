import React from 'react';
import { ArticleReaderLayout } from '../components/article/ArticleReaderLayout';
import { getArticleBySlug } from '../data/articlesData';

export const ArticleSalaryProductivityPage: React.FC = () => {
  const article = getArticleBySlug('expectancy-calculations-hygiene-salary-productivity');
  return <ArticleReaderLayout article={article} />;
};

export default ArticleSalaryProductivityPage;

