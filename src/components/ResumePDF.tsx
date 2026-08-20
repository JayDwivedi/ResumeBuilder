import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer'
import type { Resume } from '@/lib/schema'

const styles = StyleSheet.create({
  page: { 
    padding: 0, 
    fontSize: 11, 
    color: '#1F2937',
    fontFamily: 'Helvetica',
  },
  
  // Header Section
  header: {
    backgroundColor: '#EBF5FF',
    borderBottomColor: '#2563EB',
    borderBottomWidth: 4,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
  },
  name: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  title: { 
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 8,
  },
  links: {
    fontSize: 10,
    color: '#1D4ED8',
  },
  
  // Profile Image
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 16,
  },
  
  // Two Column Layout
  mainContent: {
    flexDirection: 'row',
  },
  
  // Left Column
  leftColumn: {
    width: '33%',
    backgroundColor: '#F9FAFB',
    borderRightColor: '#E5E7EB',
    borderRightWidth: 2,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  leftSection: {
    marginBottom: 28,
  },
  
  // Right Column  
  rightColumn: {
    width: '67%',
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  
  // Section Headers
  sectionHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomColor: '#2563EB',
    borderBottomWidth: 2,
    paddingBottom: 6,
    marginBottom: 12,
  },
  
  rightSectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomColor: '#2563EB',
    borderBottomWidth: 2,
    paddingBottom: 6,
    marginBottom: 12,
  },
  
  // Content Styles
  bodyText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
    marginBottom: 4,
  },
  
  list: { 
    marginTop: 0,
  },
  listItem: { 
    fontSize: 10,
    color: '#374151',
    marginBottom: 6,
    paddingLeft: 8,
  },
  
  // Skills
  skillCategory: {
    fontSize: 10,
    marginBottom: 10,
  },
  skillCategoryName: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  skillsList: {
    color: '#374151',
  },
  
  // Experience
  experienceItem: {
    marginBottom: 16,
  },
  companyRole: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  experienceDetails: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 8,
  },
  experienceBullet: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 4,
    paddingLeft: 8,
  },
  
  // Projects Section (Full Width)
  projectsSection: {
    borderTopColor: '#E5E7EB',
    borderTopWidth: 2,
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 48,
  },
  projectItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  projectName: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  projectRole: {
    fontStyle: 'italic',
    color: '#6B7280',
  },
  projectTech: {
    fontSize: 9,
    color: '#6B7280',
  },
})

const professional = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: '#171717', paddingTop: 28, paddingBottom: 28 },
  header: { alignItems: 'center', paddingHorizontal: 32, paddingBottom: 14 },
  name: { fontSize: 25, fontWeight: 'normal', textTransform: 'uppercase', marginBottom: 5 },
  title: { fontSize: 13, color: '#35649A', fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  contact: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', fontSize: 10, color: '#075BE0' },
  separator: { color: '#171717', marginHorizontal: 8 },
  divider: { borderBottomColor: '#C9CDD1', borderBottomWidth: 1.5, marginHorizontal: 25 },
  headline: { paddingHorizontal: 32, paddingVertical: 13, fontSize: 10.5, fontWeight: 'bold', lineHeight: 15 },
  body: { flexDirection: 'row' },
  sidebar: { width: '34%', backgroundColor: '#E5E5E5', paddingHorizontal: 15, paddingVertical: 12 },
  content: { width: '66%', paddingHorizontal: 17, paddingVertical: 12 },
  section: { marginBottom: 18 },
  heading: { color: '#35649A', fontSize: 15, fontWeight: 'bold', marginBottom: 9 },
  competency: { fontSize: 9.5, fontWeight: 'bold', color: '#343434', marginHorizontal: 6 },
  skillBar: { height: 5, backgroundColor: '#06416F', marginHorizontal: 8, marginTop: 4, marginBottom: 10 },
  skillLine: { fontSize: 9, lineHeight: 13, marginBottom: 7 },
  bulletRow: { flexDirection: 'row', marginBottom: 8 },
  bullet: { width: 16, fontSize: 11, lineHeight: 13 },
  bulletText: { flex: 1, fontSize: 10, lineHeight: 15 },
  jobTitle: { fontSize: 10, fontWeight: 'bold' },
  meta: { fontSize: 8.5, color: '#555555', marginBottom: 4 },
})

function ProfessionalResumePDF({ data }: { data: Resume }) {
  const summaryItems = data.summary ? data.summary.split(/(?<=[.!?])\s+/).filter(Boolean) : []
  const bullets = (items: string[]) => items.map((item, index) => (
    <View key={index} style={professional.bulletRow}>
      <Text style={professional.bullet}>❖</Text>
      <Text style={professional.bulletText}>{item}</Text>
    </View>
  ))

  return <Document><Page size="A4" style={professional.page}>
    <View style={professional.header}>
      <Text style={professional.name}>{data.name}</Text>
      {data.title && <Text style={professional.title}>{data.title}</Text>}
      <View style={professional.contact}>
        {[data.phone, data.email, ...(data.links?.map(link => link.label) ?? [])].filter(Boolean).map((value, index, all) => <View key={index} style={{ flexDirection: 'row' }}><Text>{value}</Text>{index < all.length - 1 && <Text style={professional.separator}>|</Text>}</View>)}
      </View>
    </View>
    <View style={professional.divider} />
    {(data.summary || data.title) && <Text style={professional.headline}>{data.summary || data.title}</Text>}
    <View style={professional.body}>
      <View style={professional.sidebar}>
        {!!data.expertise?.length && <View style={professional.section}><Text style={professional.heading}>Core Competencies</Text>{data.expertise.map((item, index) => <View key={index}><Text style={professional.competency}>{item}</Text><View style={professional.skillBar} /></View>)}</View>}
        {!!data.skills?.length && <View style={professional.section}><Text style={professional.heading}>Technical Skills</Text>{data.skills.map((group, index) => <Text key={index} style={professional.skillLine}><Text style={{ fontWeight: 'bold' }}>{group.category}: </Text>{group.skills.join(', ')}</Text>)}</View>}
        {!!data.languages?.length && <View style={professional.section}><Text style={professional.heading}>Languages</Text><Text>{data.languages.join(', ')}</Text></View>}
        {!!data.community?.length && <View style={professional.section}><Text style={professional.heading}>Soft Skills</Text>{data.community.map((item, index) => <Text key={index} style={[professional.skillLine, { fontWeight: 'bold' }]}>{item}</Text>)}</View>}
      </View>
      <View style={professional.content}>
        {summaryItems.length > 0 && <View style={professional.section}><Text style={professional.heading}>Profile Summary</Text>{bullets(summaryItems)}</View>}
        {!!data.certifications?.length && <View style={professional.section}><Text style={professional.heading}>Awards & Achievements</Text>{bullets(data.certifications)}</View>}
        {!!data.experience?.length && <View style={professional.section}><Text style={professional.heading}>Professional Experience</Text>{data.experience.map((job, index) => <View key={index} style={{ marginBottom: 11 }}><Text style={professional.jobTitle}>{job.role} — {job.company}</Text><Text style={professional.meta}>{[job.location, `${job.startDate} – ${job.endDate}`].filter(Boolean).join(' | ')}</Text>{bullets(job.bullets)}</View>)}</View>}
        {!!data.projects?.length && <View style={professional.section}><Text style={professional.heading}>Projects</Text>{bullets(data.projects.map(project => `${project.name}${project.role ? ` (${project.role})` : ''} — ${project.description}`))}</View>}
        {!!data.education?.length && <View style={professional.section}><Text style={professional.heading}>Education</Text>{bullets(data.education.map(education => `${education.degree} from ${education.school}${education.location ? `, ${education.location}` : ''} ${education.endDate}`))}</View>}
      </View>
    </View>
  </Page></Document>
}

export function ResumePDF({ data }: { data: Resume }) {
  if (data.template === 'professional') return <ProfessionalResumePDF data={data} />

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{data.name}</Text>
            {data.title && <Text style={styles.title}>{data.title}</Text>}
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {data.phone && (
                <Text style={styles.contactInfo}>{data.phone}</Text>
              )}
              {data.phone && data.email && (
                <Text style={styles.contactInfo}> · </Text>
              )}
              {data.email && (
                <Link src={`mailto:${data.email}`} style={styles.contactInfo}>
                  {data.email}
                </Link>
              )}
              {(data.phone || data.email) && data.location && (
                <Text style={styles.contactInfo}> · </Text>
              )}
              {data.location && (
                <Text style={styles.contactInfo}>{data.location}</Text>
              )}
            </View>
            
            {!!data.links?.length && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.links.map((link, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Link src={link.url} style={styles.links}>
                      {link.label}
                    </Link>
                    {index < data.links.length - 1 && (
                      <Text style={styles.links}> · </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
          
          {/* Profile Image */}
          {data.avatar && (
            <View>
              <Image
                style={styles.profileImage}
                src={data.avatar}
              />
            </View>
          )}
        </View>

        {/* Two Column Layout */}
        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Summary */}
            {data.summary && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Summary</Text>
                <Text style={styles.bodyText}>{data.summary}</Text>
              </View>
            )}

            {/* Core Competencies */}
            {!!data.expertise?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Core Competencies</Text>
                <View style={styles.list}>
                  {data.expertise.map((exp, i) => (
                    <Text key={i} style={styles.listItem}>• {exp}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Technical Skills */}
            {!!data.skills?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Technical Skills</Text>
                {data.skills.map((skillCat, i) => (
                  <View key={i} style={styles.skillCategory}>
                    <Text style={styles.skillCategoryName}>{skillCat.category}:</Text>
                    <Text style={styles.skillsList}> {skillCat.skills?.join(', ')}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {!!data.languages?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Languages</Text>
                <Text style={styles.bodyText}>{data.languages.join(', ')}</Text>
              </View>
            )}

            {/* Education */}
            {!!data.education?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Education</Text>
                {data.education.map((e, i) => (
                  <View key={i} style={{ marginBottom: 12 }}>
                    <Text style={[styles.bodyText, { fontWeight: 'bold', color: '#1F2937' }]}>{e.degree}</Text>
                    <Text style={styles.bodyText}>{e.school}</Text>
                    <Text style={[styles.bodyText, { fontSize: 9, color: '#6B7280' }]}>
                      {e.location} | {e.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {!!data.certifications?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Certifications</Text>
                <View style={styles.list}>
                  {data.certifications.map((cert, i) => (
                    <Text key={i} style={styles.listItem}>• {cert}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Professional Experience */}
            {!!data.experience?.length && (
              <View>
                <Text style={styles.rightSectionHeader}>Professional Experience</Text>
                {data.experience.map((exp, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <Text style={styles.companyRole}>
                      {exp.company} — {exp.role}
                    </Text>
                    <Text style={styles.experienceDetails}>
                      {exp.location} | {exp.startDate} – {exp.endDate}
                    </Text>
                    {exp.bullets?.length > 0 && (
                      <View style={styles.list}>
                        {exp.bullets.map((bullet, j) => (
                          <Text key={j} style={styles.experienceBullet}>- {bullet}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

          </View>
        </View>

        {/* Projects Section (no forced break; lets PDF engine paginate naturally) */}
        {!!data.projects?.length && (
          <View style={styles.projectsSection}>
            <Text style={styles.rightSectionHeader}>Selected Projects</Text>
            {data.projects.map((project, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.bodyText}>
                  <Text style={styles.projectName}>- {project.name}</Text>
                  {project.role && (
                    <Text style={styles.projectRole}> ({project.role})</Text>
                  )}
                  <Text> — {project.description}</Text>
                  {project.technologies?.length > 0 && (
                    <Text style={styles.projectTech}> [{project.technologies.join(', ')}]</Text>
                  )}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
