import { VisibilityOffIcon, VisibilityOnIcon } from '@assets';
import cn from '@utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

const InputVariants = cva(
  'h-12 w-full rounded-xl bg-slate-50 font-normal py-3 pl-6 pr-14 placeholder:text-slate-400 border-[1px] outline-none border-transparent ' +
    'hover:border-blue-300 focus:border-blue-500',
  {
    variants: {
      size: {
        lg: 'h-12 text-base',
        sm: 'h-[44px] text-sm',
      },
      isInvalid: {
        true: '!border-red-700',
        false: '',
      },
    },
    defaultVariants: {
      isInvalid: false,
    },
  },
);

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof InputVariants> {
  isInvalid?: boolean;
  additionalClass?: string;
}

// forwardRef<ref가 참조하는 요소 타입, 컴포넌트 props의 타입>
const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ size, isInvalid, additionalClass, ...props }, ref) => {
    const [showPswd, setShowPswd] = useState<boolean>(false);
    return (
      <div className={cn('relative', additionalClass)}>
        <input
          ref={ref}
          type={showPswd ? 'text' : 'password'}
          className={cn(InputVariants({ size, isInvalid }))}
          {...props}
        />
        {showPswd ? (
          <VisibilityOnIcon
            onClick={() => setShowPswd(!showPswd)}
            className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
          />
        ) : (
          <VisibilityOffIcon
            onClick={() => setShowPswd(!showPswd)}
            className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
          />
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
