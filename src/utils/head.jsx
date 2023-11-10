import { Helmet } from 'react-helmet';
import React from 'react';
export const head = (name) => {
  return (
    <Helmet>
      <title>{name}</title>
      <meta property="og:title" content={name} />
    </Helmet>
  );
};