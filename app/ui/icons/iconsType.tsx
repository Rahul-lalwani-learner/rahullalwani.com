import { ColabIcon } from "./ColabIcon";
import { DocumentIcon } from "./DocumentIcon";
import { DownloadDocIcon } from "./DownloadDocIcon";
import { GithubIcon } from "./GithubIcon";
import { GlobeIcon } from "./GlobeIcon";
import { JupyterIcon } from "./JupyterNotebookIcon";
import { LinkedinIcon } from "./LinkedinIcon";
import { MailIcon } from "./MailIcon";

export interface iconProps{
    size ?: 'size-4' | 'size-6' | 'size-3', 
    color ?: 'white' | 'black', 
    extraClass ?: string
}


export const iconComponents = {
    linkedin: LinkedinIcon,
    github: GithubIcon,
    mail: MailIcon,
    globe: GlobeIcon,
    resume: DownloadDocIcon, 
    document: DocumentIcon, 
    colab: ColabIcon, 
    jupyter: JupyterIcon
};