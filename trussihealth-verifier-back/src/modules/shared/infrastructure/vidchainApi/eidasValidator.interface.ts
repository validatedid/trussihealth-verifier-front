export interface EidasValidatorResponseFailDto {
  indication: string;
  checks: string[];
  warnings: any[];
  errors: string[];
}

export interface EidasValidatorResponseDto {
  indication: string;
  checks: string[];
  warnings: any[];
  errors: any[];
  reports: Report[];
}

interface Report {
  SimpleReport: SimpleReport;
}

interface SimpleReport {
  ValidationPolicy: ValidationPolicy;
  DocumentName: string;
  ValidSignaturesCount: number;
  SignaturesCount: number;
  ContainerType: null;
  signatureOrTimestamp: SignatureOrTimestamp[];
  Semantic: null;
  ValidationTime: string;
}

interface ValidationPolicy {
  PolicyName: string;
  PolicyDescription: string;
}

interface SignatureOrTimestamp {
  Signature: Signature;
}

interface Signature {
  SigningTime: string;
  BestSignatureTime: string;
  SignedBy: string;
  SignatureLevel: SignatureLevel;
  SignatureScope: SignatureScope[];
  Timestamps: null;
  Filename: null;
  CertificateChain: CertificateChain;
  Indication: string;
  SubIndication: null;
  AdESValidationDetails: null;
  QualificationDetails: QualificationDetails;
  Id: string;
  CounterSignature: null;
  ParentId: null;
  SignatureFormat: string;
  ExtensionPeriodMin: string;
  ExtensionPeriodMax: string;
}

interface CertificateChain {
  Certificate: Certificate[];
}

interface Certificate {
  id: string;
  qualifiedName: string;
}

interface QualificationDetails {
  Error: any[];
  Warning: Warning[];
  Info: any[];
}

interface Warning {
  value: string;
  Key: string;
}

interface SignatureLevel {
  value: string;
  description: string;
}

interface SignatureScope {
  value: string;
  Id: string;
  name: string;
  scope: string;
}
