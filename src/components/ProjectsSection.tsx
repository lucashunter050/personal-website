'use client';

import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import ProjectCard from './ProjectCard';
import styles from './ProjectsSection.module.css';

interface Project {
  id: string;
  title: string;
  description: string;
  expandedContent?: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  blogPosts?: { title: string; url: string }[];
  isHighlighted?: boolean;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Get all unique skills from all projects
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(skill => skillSet.add(skill));
    });
    return Array.from(skillSet).sort();
  }, [projects]);

  // Popular skills to show by default
  const popularSkills = ['Python', 'JavaScript', 'TypeScript', 'React', 'C++', 'Go', 'Swift', 'iOS'];
  
  // Skills to display (either popular ones or all)
  const displayedSkills = showAllSkills ? allSkills : popularSkills.filter(skill => allSkills.includes(skill));

  // Filter projects based on selected skills
  const filteredProjects = useMemo(() => {
    if (selectedFilters.length === 0) {
      return projects;
    }
    return projects.filter(project =>
      selectedFilters.some(filter => project.techStack.includes(filter))
    );
  }, [projects, selectedFilters]);

  const toggleFilter = (skill: string) => {
    setSelectedFilters(prev =>
      prev.includes(skill)
        ? prev.filter(f => f !== skill)
        : [...prev, skill]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div>
      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <div className={styles.filterTitle}>
            <Filter size={20} />
            Filter by Technology
          </div>
          {selectedFilters.length > 0 && (
            <button onClick={clearAllFilters} className={styles.clearButton}>
              <X size={16} />
              Clear All ({selectedFilters.length})
            </button>
          )}
        </div>

        <div className={styles.skillFilters}>
          {displayedSkills.map(skill => (
            <button
              key={skill}
              onClick={() => toggleFilter(skill)}
              className={`${styles.skillFilter} ${
                selectedFilters.includes(skill) ? styles.active : ''
              }`}
            >
              {skill}
              {selectedFilters.includes(skill) && <X size={14} />}
            </button>
          ))}
          
          {!showAllSkills && allSkills.length > popularSkills.length && (
            <button
              onClick={() => setShowAllSkills(true)}
              className={styles.showMoreButton}
            >
              +{allSkills.length - displayedSkills.length} more
            </button>
          )}
          
          {showAllSkills && (
            <button
              onClick={() => setShowAllSkills(false)}
              className={styles.showLessButton}
            >
              Show less
            </button>
          )}
        </div>

        {selectedFilters.length > 0 && (
          <div className={styles.filterResults}>
            Showing {filteredProjects.length} of {projects.length} projects
            {selectedFilters.length > 0 && (
              <span className={styles.filterList}>
                for: {selectedFilters.join(', ')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              expandedContent={project.expandedContent}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
              blogPosts={project.blogPosts}
              isHighlighted={project.isHighlighted}
            />
          ))
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h3>No projects found</h3>
            <p>Try adjusting your filters or <button onClick={clearAllFilters} className={styles.clearLink}>clear all filters</button></p>
          </div>
        )}
      </div>
    </div>
  );
}
