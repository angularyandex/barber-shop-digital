
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, icon, price }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-salon-accent/10 text-salon-accent">
            <Icon name={icon} size={24} />
          </div>
          <div className="text-right text-lg font-medium text-salon-primary">{price}</div>
        </div>
        <h3 className="text-xl font-semibold mt-4">{title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/services/${id}`}>Подробнее</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
