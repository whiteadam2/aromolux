import React from "react";
import ContentLoader from "react-content-loader";

export function ProductsSkeleton({ amount }) {
  const fakeProducts = [...new Array(amount)];

  return (
    <>
      {fakeProducts.map((_, index) => (
        <ContentLoader
          key={index}
          speed={1}
          width={160}
          height={320}
          viewBox="0 0 160 320"
          backgroundColor="#fbbf24"
          foregroundColor="#ffd57a"
        >
          <rect x="8" y="15" rx="0" ry="0" width="1" height="0" />
          <rect x="0" y="4" rx="0" ry="0" width="160" height="32" />
          <rect x="0" y="62" rx="0" ry="0" width="160" height="160" />
          <rect x="6" y="241" rx="0" ry="0" width="149" height="20" />
          <rect x="11" y="279" rx="12" ry="12" width="140" height="39" />
        </ContentLoader>
      ))}
    </>
  );
}
