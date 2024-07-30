/* eslint-disable */
import { TextLogoIcon } from '@assets';
import Button from '@components/Button';
import BaseInput from '@components/Input/BaseInput';
import PasswordInput from '@components/Input/PasswordInput';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface FormValues {
  id: string;
  password: string;
}
function SignInPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: formState,
  } = useForm<FormValues>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => data;

  const { errors, touchedFields } = formState;

  const password = useWatch({ control: control, name: 'password' });
  const id = useWatch({ control: control, name: 'id' });

  return (
    <div className="flex flex-col items-center pt-[48px] tablet:pt-[64px] desktop:pt-[120px]">
      <div className="flex w-[343px] flex-col items-center tablet:w-[640px]">
        <TextLogoIcon width={270} height={89} />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] w-full">
          <div>
            <label htmlFor="id" className="self-start text-base font-semibold">
              아이디
            </label>
            <BaseInput
              {...register('id', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '유효한 이메일 주소를 입력해주세요.',
                },
              })}
              id="id"
              size="lg"
              isInvalid={!!errors.id}
              placeholder="이메일을 입력해주세요."
              additionalClass="mt-3"
            />
            {errors.id && (
              <p className="ml-4 mt-2 text-sm font-normal text-red-700">
                {errors.id.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="self-start text-base font-semibold"
            >
              비밀번호
            </label>
            <PasswordInput
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              id="password"
              size="lg"
              isInvalid={!!errors.password}
              placeholder="비밀번호를 입력해주세요."
              additionalClass="w-full mt-3"
            />
            {errors.password && (
              <p className="ml-4 mt-2 text-sm font-normal text-red-700">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            shape="solid"
            size="lg"
            additionalClass="w-full mt-[48px]"
            type="submit"
            disabled={id === '' || password === ''}
          >
            로그인하기
          </Button>
        </form>
        <div className="mt-[40px] flex flex-row">
          <span>슬리드 투 두가 처음이신가요?</span>
          <Link to="/sign-up" className="ml-2 text-blue-600 underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
