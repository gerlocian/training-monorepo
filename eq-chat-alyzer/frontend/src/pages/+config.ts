import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';
import { HeadDefault } from './head.module';
import { LayoutDefault } from './layout.module';
import { Page } from './page.module';

export default {
    title: 'EQ Chat Analyzer',
    extends: vikeReact,

    Head: HeadDefault,
    Layout: LayoutDefault,
    Page
} satisfies Config;

