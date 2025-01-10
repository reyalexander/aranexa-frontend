import classNames from 'classnames';

type IButtonProps = {
  xl?: boolean;
  variant?: 'primary' | 'secondary' | 'danger'; // o los que necesites
  children: React.ReactNode;
};

const Button = (props: IButtonProps) => {
  const { xl = false, variant = 'primary', children } = props;

  const btnClass = classNames('btn', {
    'btn-xl': xl,
    'btn-base': !xl,
    'btn-primary': variant === 'primary',
    'btn-secondary': variant === 'secondary',
    'btn-danger': variant === 'danger',
  });

  return (
    <div className={btnClass}>
      {children}

      <style jsx>
        {`
          /* Clases básicas */
          .btn {
            @apply inline-block rounded-md text-center;
          }

          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }

          /* Variante Primary */
          .btn-primary {
            @apply text-white bg-primary-500;
          }
          .btn-primary:hover {
            @apply bg-primary-600;
          }

          /* Variante Secondary */
          .btn-secondary {
            @apply text-white bg-green-500;
          }
          .btn-secondary:hover {
            @apply bg-green-600;
          }

          /* Variante Danger */
          .btn-danger {
            @apply text-white bg-red-500;
          }
          .btn-danger:hover {
            @apply bg-red-600;
          }
        `}
      </style>
    </div>
  );
};

export { Button };
