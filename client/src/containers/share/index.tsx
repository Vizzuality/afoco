import { useCallback, useEffect, useState } from 'react';

import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';

import { usePathname } from 'next/navigation';

import { X } from 'lucide-react';
import { Facebook, Twitter, Mail, Share2 } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
          <TooltipTrigger asChild data-cy="share-tooltip-button">
            <div
              className={cn({
                'flex h-8 w-8 items-center justify-center rounded-full hover:bg-yellow-100': true,
                'bg-yellow-100 hover:bg-yellow-400': pathname.includes('projects'),
              })}
            >
              <Share2 className="text-yellow-900" size={14} />
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
            <Button
              variant="primary"
              size="base"
              className="w-20"
              onClick={copyShareLink}
              data-cy="share-link-button"
            >
              {shareLinkBtnText}
            </Button>
          </div>
          <div className="flex space-x-4 pt-6">
            <Button variant="primary" className="rounded-full">
              <FacebookShareButton
                url={currentUrl}
                title={'AFoCO'}
                aria-label="share facebook"
                data-testid="share-facebook-button"
                data-cy="share-facebook-button"
              >
                <Facebook className="fill-white text-white" size={16} />
              </FacebookShareButton>
            </Button>

            <Button variant="primary" className="rounded-full">
              <TwitterShareButton
                url={currentUrl}
                title={'AFoCO'}
                aria-label="share twitter"
                data-testid="share-twitter-button"
                data-cy="share-twitter-button"
              >
                <Twitter className="fill-white text-white" size={16} />
              </TwitterShareButton>
            </Button>

            <Button variant="primary" className="rounded-full" data-cy="email-share-button">
              <EmailShareButton
                url={currentUrl}
                title={'AFoCO'}
                subject={'I want to share this AFoCO link with you'}
                body={''}
                aria-label="share email"
                data-testid="share-email-button"
              >
                <Mail className="fill-white text-yellow-400" size={16} />
              </EmailShareButton>
            </Button>
          </div>
        </div>
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent absolute right-7 top-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:text-green-900">
          <X className="h-4 w-4 text-yellow-400" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
