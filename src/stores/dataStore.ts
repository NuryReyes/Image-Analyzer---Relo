import { makeAutoObservable, observable, runInAction } from 'mobx';

export interface Image {
  id: number;
  url: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface BoundingBox {
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;
}

export interface PostBody {
  imageId: number;
  annotations: [
    {
      categoryId: number;
      boundingBoxes: [BoundingBox];
    },
  ];
}

export class DataStore {
  unannalizedImages: Map<number, Image> = new Map();
  categories: Map<number, Category> = new Map();
  currentImageId: number | undefined;
  currentCategoryId: number | undefined;
  currentBoundingBox: BoundingBox | undefined;

  constructor() {
    makeAutoObservable(this, {
      unannalizedImages: observable,
      categories: observable,
      currentImageId: observable,
      currentCategoryId: observable,
      currentBoundingBox: observable,
    });
  }

  getImageById = (id: number) => {
    return this.unannalizedImages.get(id)?.url;
  };

  setImages = (images: Image[]) => {
    runInAction(() => images.map((img) => this.unannalizedImages.set(img.id, img)));
  };

  getCategoryById = (id: number) => {
    return this.categories.get(id)?.name;
  };

  setCategories = (categories: Category[]) => {
    runInAction(() => categories.map((category) => this.categories.set(category.id, category)));
  };

  setCurrentImageId(id: number) {
    this.currentImageId = id;
  }

  setCurrentCategoryId(id: number) {
    this.currentCategoryId = id;
  }

  setCurrentBoundingBox(boundingBox: BoundingBox) {
    this.currentBoundingBox = boundingBox;
  }
}
