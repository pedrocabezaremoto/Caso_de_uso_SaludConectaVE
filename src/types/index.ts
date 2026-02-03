export type RelationType = 'include' | 'extend';

export interface Actor {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
}

export interface UseCase {
    id: string;
    name: string;
    description: string;
    requirement: string;
    actorId: string;
    isParent?: boolean;
    isChild?: boolean;
}

export interface Relationship {
    id: string;
    type: RelationType;
    from: string; // UseCase ID
    to: string;   // UseCase ID
    label: string;
}

export interface FlowPhase {
    id: number;
    name: string;
    duration: number;
    useCases: string[];
    description: string;
    activeActorId?: string;
}
