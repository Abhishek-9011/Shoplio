import { Button } from "./Button";

interface SellerCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  rating?: number;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const SellerCard = (props: SellerCardProps) => {
  const {
    title,
    description,
    image,
    price,
    discountedPrice,
    stock,
    rating,
    onUpdate,
    onDelete,
  } = props;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 max-w-xl w-full flex gap-4">
      {/* Image */}
      <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-md">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          {rating !== undefined && rating > 0 && (
            <div className="text-yellow-500 text-sm">
              ⭐ {rating.toFixed(1)}
            </div>
          )}

          <div className="flex items-center gap-2">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold text-purple-700">
                  ₹{discountedPrice}
                </span>
                <span className="text-sm line-through text-gray-500">
                  ₹{price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-purple-700">
                ₹{price}
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500">
            {stock <= 0 ? "Out of Stock" : `${stock} in stock`}
          </div>
        </div>

        {/* Seller Actions */}
        <div className="mt-2 flex gap-2">
          <Button
            variant="secondary"
            size="md"
            text="Update"
            onClick={onUpdate}
          />
          <Button
            variant="secondary"
            size="md"
            text="Delete"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};
