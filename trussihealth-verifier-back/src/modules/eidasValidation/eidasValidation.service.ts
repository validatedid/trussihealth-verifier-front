import { Injectable } from '@nestjs/common';
import { VerifiableCredentialDto } from './eidasValidation.controller';
import { EidasValidatior } from '../shared/infrastructure/vidchainApi/eidasValidatior';
import { VerifiableCredential } from '../shared/infrastructure/vidchainApi/verifiableCredential.interface';
import { pkcs7, pki, asn1 } from 'node-forge';
import { X509Certificate } from 'crypto';

export interface EidasValidationResponseDto {
  valid: boolean;
  eidasCertInside: boolean;
  error?: string | string[];
  certInfo?: {
    issuer: string;
    subject: string;
    validFrom: number;
    validTo: number;
  };
  cert?: string;
}
@Injectable()
export class EidasValidationService {
  constructor(private eidasValidatior: EidasValidatior) {}
  async validate(
    verifiableCredentialDto: VerifiableCredentialDto,
  ): Promise<EidasValidationResponseDto> {
    if (
      !this.hasEidasCert(
        verifiableCredentialDto.verifiableCredential as VerifiableCredential,
      )
    ) {
      return { valid: false, eidasCertInside: false };
    }
    try {
      const result = await this.eidasValidatior.validate(
        verifiableCredentialDto.verifiableCredential as VerifiableCredential,
      );
      if (result.indication !== 'TOTAL_PASSED') {
        return { valid: false, eidasCertInside: true, error: result.errors };
      }
    } catch (error) {
      console.log(error);
      return { valid: false, eidasCertInside: true, error: error.toString() };
    }

    const certInfo = this.getEidasCertInfo(
      verifiableCredentialDto.verifiableCredential as VerifiableCredential,
    );
    const cert = this.extractCertificate(
      verifiableCredentialDto.verifiableCredential as VerifiableCredential,
    );

    return { valid: true, eidasCertInside: true, certInfo, cert };
  }

  private hasEidasCert(verifiableCredential: VerifiableCredential): boolean {
    if (
      verifiableCredential.proof &&
      Array.isArray(verifiableCredential.proof)
    ) {
      return verifiableCredential.proof.some((proof) => 'cades' in proof);
    }
    return false;
  }

  private getEidasCertInfo(verifiableCredential: VerifiableCredential) {
    const eidasProof = verifiableCredential.proof.find(
      (proof) => 'cades' in proof,
    );
    const signature = pkcs7.messageFromPem(eidasProof.cades);
    const pemCertificate = pki.certificateToPem(signature.certificates[0]);
    const x509Certificate = new X509Certificate(
      Buffer.from(pemCertificate, 'utf8'),
    );

    return {
      issuer: x509Certificate.issuer,
      subject: x509Certificate.subject,
      validFrom: Date.parse(x509Certificate.validFrom),
      validTo: Date.parse(x509Certificate.validTo),
    };
  }

  private extractCertificate(
    verifiableCredential: VerifiableCredential,
  ): string {
    const eidasProof = verifiableCredential.proof.find(
      (proof) => 'cades' in proof,
    );
    const signature = pkcs7.messageFromPem(eidasProof.cades);
    pkcs7.messageT;
    const pemCertificate = pki.certificateToPem(signature.certificates[0]);
    return Buffer.from(pemCertificate).toString('base64');
  }
}
