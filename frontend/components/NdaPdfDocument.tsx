"use client";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { STANDARD_TERMS_SECTIONS, SOURCE_ATTRIBUTION } from "@/lib/ndaContent";
import type { CoverPageData } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#27272a",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: "#18181b",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: "#71717a",
    marginBottom: 20,
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  fieldBlock: {
    width: "50%",
    paddingRight: 8,
  },
  fieldLabel: {
    fontSize: 8,
    textTransform: "uppercase",
    color: "#71717a",
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 10,
    color: "#18181b",
  },
  table: {
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeaderCell: {
    flex: 1,
    padding: 6,
    fontWeight: 700,
    fontSize: 9,
    backgroundColor: "#fafafa",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e4e4e7",
  },
  tableLabelCell: {
    width: 90,
    padding: 6,
    fontSize: 9,
    color: "#71717a",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e4e4e7",
  },
  tableCell: {
    flex: 1,
    padding: 6,
    fontSize: 9,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e4e4e7",
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: 700,
    color: "#18181b",
    marginBottom: 10,
  },
  clauseTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#18181b",
    marginTop: 8,
    marginBottom: 3,
  },
  clauseBody: {
    fontSize: 9.5,
    textAlign: "justify",
  },
  footer: {
    marginTop: 20,
    fontSize: 7.5,
    color: "#a1a1aa",
  },
});

function FieldBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

export default function NdaPdfDocument({ cover }: { cover: CoverPageData }) {
  return (
    <Document title="Mutual Non-Disclosure Agreement">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Mutual Non-Disclosure Agreement</Text>
        <Text style={styles.subtitle}>Cover Page</Text>

        <View style={styles.fieldRow}>
          <FieldBlock label="Purpose" value={cover.purpose} />
          <FieldBlock label="Effective Date" value={cover.effectiveDate} />
        </View>
        <View style={styles.fieldRow}>
          <FieldBlock label="MNDA Term" value={cover.mndaTerm} />
          <FieldBlock
            label="Term of Confidentiality"
            value={cover.confidentialityTerm}
          />
        </View>
        <View style={styles.fieldRow}>
          <FieldBlock label="Governing Law" value={cover.governingLaw} />
          <FieldBlock label="Jurisdiction" value={cover.jurisdiction} />
        </View>
        <View style={styles.fieldRow}>
          <FieldBlock
            label="MNDA Modifications"
            value={cover.modifications}
          />
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabelCell}></Text>
            <Text style={styles.tableHeaderCell}>Party 1</Text>
            <Text style={styles.tableHeaderCell}>Party 2</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabelCell}>Print Name</Text>
            <Text style={styles.tableCell}>{cover.party1.name}</Text>
            <Text style={styles.tableCell}>{cover.party2.name}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabelCell}>Company</Text>
            <Text style={styles.tableCell}>{cover.party1.company}</Text>
            <Text style={styles.tableCell}>{cover.party2.company}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabelCell}>Signature</Text>
            <Text style={styles.tableCell}> </Text>
            <Text style={styles.tableCell}> </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabelCell}>Date</Text>
            <Text style={styles.tableCell}> </Text>
            <Text style={styles.tableCell}> </Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>Standard Terms</Text>
        {STANDARD_TERMS_SECTIONS.map((section) => (
          <View key={section.title} wrap={false}>
            <Text style={styles.clauseTitle}>{section.title}</Text>
            <Text style={styles.clauseBody}>{section.body}</Text>
          </View>
        ))}

        <Text style={styles.footer}>{SOURCE_ATTRIBUTION}</Text>
      </Page>
    </Document>
  );
}
