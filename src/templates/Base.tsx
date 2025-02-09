import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
  </div>
);

export { Base };
