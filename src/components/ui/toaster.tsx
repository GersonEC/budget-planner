import { CircleCheckBig, CircleX, Info, TriangleAlert } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              <div className='flex items-center gap-2 '>
                {props.variant === 'success' && (
                  <CircleCheckBig className='text-green-400' />
                )}
                {props.variant === 'destructive' && (
                  <CircleX className='text-red-400' />
                )}
                {props.variant === 'info' && <Info className='text-blue-400' />}
                {props.variant === 'warning' && (
                  <TriangleAlert className='text-yellow-400' />
                )}
                {title && <ToastTitle>{title}</ToastTitle>}
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
