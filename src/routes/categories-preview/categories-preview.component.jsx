import { useCategories } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { Fragment } from "react";

const CategoriesPreview = () => {
  const { categoriesMap } = useCategories();
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
