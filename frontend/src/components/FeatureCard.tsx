import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CheckIcon = () => (
  <div className="mr-2 rounded-full bg-green-100 p-1 text-green-600 ">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  </div>
);

const FeatureList = ({ features }) => (
  <ul className="mb-6 space-y-2">
    {features.map((feature, index) => (
      <li key={index} className="flex items-center">
        <CheckIcon />
        {feature}
      </li>
    ))}
  </ul>
);

const FeatureCard = ({ title, description, features, link, buttonText }) => (
  <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl pt-0 ">
    <CardHeader className="bg-gray-800 text-white py-1.5">
      <CardTitle className="text-2xl">{title}</CardTitle>
      <CardDescription className="text-gray-300">{description}</CardDescription>
    </CardHeader>
    <CardContent className="pt-0">
      <FeatureList features={features} />
    </CardContent>
    <CardFooter className="bg-gray-50 px-6 py-4">
      <Link to={link} className="w-full">
        <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">
          {buttonText}
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

export default FeatureCard;