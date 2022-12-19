import ProjectStep1 from './Project/steps/Step1'
import ProjectStep2 from './Project/steps/Step2'
import ProjectStep3 from './Project/steps/Step3'
import ProjectStep4 from './Project/steps/Step4'

import TeamStep1 from './Team/steps/Step1'
import TeamStep2 from './Team/steps/Step2'
import TeamStep3 from './Team/steps/Step3'
import TeamStep4 from './Team/steps/Step4'
import TeamStep5 from './Team/steps/Step5'

export const ProjectSteps = [
    {
        id: 0,
        content: <ProjectStep1 />,
    },
    {
        id: 1,
        content: <ProjectStep2 />,
    },
    {
        id: 3,
        content: <ProjectStep3 />,
    },
    {
        id: 3,
        content: <ProjectStep4 />,
    },
]

export const TeamSteps = [
    {
        id: 0,
        content: <TeamStep1 />,
    },
    {
        id: 1,
        content: <TeamStep2 />,
    },
    {
        id: 3,
        content: <TeamStep3 />,
    },
    {
        id: 3,
        content: <TeamStep4 />,
    },
    {
        id: 4,
        content: <TeamStep5 />,
    },
]