import { useCallback, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Facebook, Twitter, Linkedin, Mail, Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function Share() {
  const pathname = usePathname();

  const [currentUrl, setCurrentUrl] = useState<string>('');

  const [shareLinkBtnText, setShareLinkBtnText] = useState('Copy');
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [pathname]);

  const copyShareLink = useCallback(() => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setShareLinkBtnText('Copied');
        setTimeout(function () {
          setShareLinkBtnText('Copy');
        }, 5000);
      })
      .catch((err: ErrorEvent) => {
        console.info(err.message);
      });
  }, [currentUrl]);

  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-yellow-100">
              <Share2 className="text-yellow-900" size={18} />
            </div>
          </TooltipTrigger>
          <TooltipContent side={'left'} sideOffset={14}>
            <p className="text-sm text-yellow-900">
              {pathname.includes('countries') ? 'Share country' : 'Share project'}
            </p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="p-0">
        <h3 className="border-b px-6 py-4 text-xl font-medium">Share</h3>
        <div className="flex flex-col space-y-2 px-6 pb-10 pt-4">
          <p className="text-base text-gray-500">Copy and paste link to share</p>
          <div className="flex w-full space-x-2">
            <div className="bg-background flex h-10 rounded-md border px-3 py-2 text-sm text-gray-900">
              <p className="w-[410px] truncate">{currentUrl}</p>
            </div>
            <Button variant="primary" size="base" className="w-20" onClick={copyShareLink}>
              {shareLinkBtnText}
            </Button>
          </div>
          <div className="flex space-x-4 pt-6">
            <Button variant="primary" className="rounded-full">
              <a
                className="flex flex-row hover:underline"
                type="button"
                role="button"
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                rel="noreferrer"
                target="_blank"
              >
                <Facebook className="fill-white text-white" size={16} />
              </a>
            </Button>

            <Button variant="primary" className="rounded-full">
              <Twitter className="fill-white text-white" size={16} />
            </Button>

            <Button variant="primary" className="rounded-full">
              <Linkedin className="fill-white text-white" size={16} />
            </Button>

            <Button variant="primary" className="rounded-full">
              <Mail className="fill-white text-yellow-400" size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
