'use client';

import { useState } from 'react';
import { Code, Github, ExternalLink, ChevronDown, ChevronUp, Star } from 'lucide-react';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  description: string;
  expandedContent?: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  blogPosts?: { title: string; url: string }[];
  isHighlighted?: boolean;
}

export default function ProjectCard({
  title,
  description,
  expandedContent,
  techStack,
  githubUrl,
  demoUrl,
  blogPosts,
  isHighlighted = false
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.card} ${isHighlighted ? styles.highlighted : ''}`}>
      {isHighlighted && (
        <div className={styles.highlightBadge}>
          <Star size={16} />
          Featured Project
        </div>
      )}
      
      <div className={styles.cardIcon}>
        <Code size={32} />
      </div>
      
      <h3 className={styles.cardTitle}>{title}</h3>
      
      <p className={styles.cardDescription}>{description}</p>
      
      <div className={styles.techTags}>
        {techStack.map((tech) => (
          <span key={tech} className={styles.techTag}>{tech}</span>
        ))}
      </div>

      {/* Expanded Content */}
      {isExpanded && expandedContent && (
        <div className={styles.expandedContent}>
          <p className={styles.expandedText}>{expandedContent}</p>
          
          {blogPosts && blogPosts.length > 0 && (
            <div className={styles.blogPosts}>
              <h4 className={styles.blogPostsTitle}>Featured Blog Posts:</h4>
              {blogPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.blogPostLink}
                >
                  <ExternalLink size={16} />
                  {post.title}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className={styles.cardFooter}>
        <div className={styles.cardLinks}>
          {githubUrl && (
            <a href={githubUrl} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
              <Github size={16} />
              Code
            </a>
          )}
          {demoUrl && (
            <a href={demoUrl} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} />
              Demo
            </a>
          )}
        </div>
        
        {expandedContent && (
          <button onClick={toggleExpanded} className={styles.expandButton}>
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                Less
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                More
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
