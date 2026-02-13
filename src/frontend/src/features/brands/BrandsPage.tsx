import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Store } from 'lucide-react';
import { useBrands } from './useBrands';
import BrandDetailSheet from './BrandDetailSheet';

export default function BrandsPage() {
  const { brands, isLoading, error } = useBrands();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">Loading brands...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="py-8 text-center">
          <p className="text-destructive">Failed to load brands. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
          Featured Brands
        </h2>
        <p className="text-muted-foreground">
          Discover exclusive deals from top retailers
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Brands Grid */}
      {filteredBrands.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No brands found matching your search.' : 'No brands available yet.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredBrands.map((brand) => (
            <Card
              key={brand.name}
              className="cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/10"
              onClick={() => setSelectedBrand(brand.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{brand.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {brand.couponCount} {brand.couponCount === 1 ? 'coupon' : 'coupons'} available
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Brand Detail Sheet */}
      {selectedBrand && (
        <BrandDetailSheet
          brandName={selectedBrand}
          onClose={() => setSelectedBrand(null)}
        />
      )}
    </div>
  );
}
