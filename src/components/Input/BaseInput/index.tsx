import cn from '@utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';

const InputVariants = cva(
  'h-12 w-full rounded-xl bg-slate-50 font-normal py-3 px-6 placeholder:text-slate-400 border-[1px] outline-none border-transparent ' +
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
const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ size, isInvalid, additionalClass, ...props }, ref) => (
    <input
      ref={ref}
      type="text"
      className={cn(InputVariants({ size, isInvalid }), additionalClass)}
      {...props}
    />
  ),
);

BaseInput.displayName = 'BaseInput';

export default BaseInput;
