/**
 * Map frontend form data to backend API format
 */
export function mapFormDataToBackend(formData: any, mobile: string) {
  console.log('[DataMapper] ========================================');
  console.log('[DataMapper] STARTING mapFormDataToBackend');
  console.log('[DataMapper] Mobile:', mobile);
  console.log('[DataMapper] Form data keys:', Object.keys(formData));
  console.log('[DataMapper] Form data full object (first 50 keys):', Object.keys(formData).slice(0, 50));
  
  // Check if any trust-related field exists (more lenient check)
  const hasTrustData = !!(
    formData.trustName || formData.orgType || formData.chairmanName || 
    formData.secretaryName || formData.establishmentYear || formData.openingOrderNo ||
    formData.rcNo || formData.additionalClassesDetails || formData.latestRenewalDetails ||
    formData.firstBoardExam10th || formData.firstBoardExam12th || formData.ptaFormed
  );
  
  console.log('[DataMapper] Has trust data?', hasTrustData);
  console.log('[DataMapper] Trust fields:', {
    trustName: formData.trustName,
    orgType: formData.orgType,
    chairmanName: formData.chairmanName,
    secretaryName: formData.secretaryName,
    establishmentYear: formData.establishmentYear,
    openingOrderNo: formData.openingOrderNo
  });
  console.log('[DataMapper] Staff fields:', {
    teachingPG: formData.teachingPG,
    teachingUG: formData.teachingUG,
    teachingTETBEd: formData.teachingTETBEd,
    teachingTETSecondary: formData.teachingTETSecondary,
    supportAccountants: formData.supportAccountants,
    nonTeachingOA: formData.nonTeachingOA,
    nonTeachingDrivers: formData.nonTeachingDrivers,
    nonTeachingWatchman: formData.nonTeachingWatchman,
    nonTeachingAaya: formData.nonTeachingAaya,
    nonTeachingSweepers: formData.nonTeachingSweepers,
    nonTeachingOthers: formData.nonTeachingOthers,
    classStrength: formData.classStrength,
    classStrengthKeys: formData.classStrength ? Object.keys(formData.classStrength) : []
  });
  console.log('[DataMapper] Infrastructure fields:', {
    locationType: formData.locationType,
    landAcres: formData.landAcres,
    landSqFt: formData.landSqFt,
    numberOfBuildings: formData.numberOfBuildings,
    buildings: formData.buildings,
    buildingsLength: formData.buildings ? (Array.isArray(formData.buildings) ? formData.buildings.length : 'not array') : 'null',
    buildingsKeys: formData.buildings && Array.isArray(formData.buildings) && formData.buildings.length > 0 ? Object.keys(formData.buildings[0]) : [],
    stabilityNo: formData.stabilityNo,
    licenseNo: formData.licenseNo,
    fireNocNo: formData.fireNocNo,
    sanitaryNo: formData.sanitaryNo
  });
  const schoolTypes = formData.schoolTypes || [];
  
  const result = {
    basic: {
      school_code: formData.schoolCode || null,
      school_name: formData.schoolName || null,
      school_address: formData.address || null,
      taluk: formData.taluk || null,
      locality: formData.localBody || null,
      pin_code: formData.pinCode || null,
      school_whatsapp_no: formData.schoolWhatsapp || null,
      school_email_id: formData.schoolEmail || null,
      is_nursery_primary: schoolTypes.includes('N&P (Nursery & Primary)'),
      is_matriculation: schoolTypes.includes('Matriculation'),
      is_state_board_sf: schoolTypes.includes('State Board SF'),
      is_cbse: schoolTypes.includes('CBSE'),
      is_icse: schoolTypes.includes('ICSE'),
      is_igcse: schoolTypes.includes('IGCSE'),
      is_ib: schoolTypes.includes('IB'),
      correspondent_title: formData.correspondentTitle || null,
      correspondent_name: formData.correspondentName || null,
      correspondent_mobile_no: formData.correspondentMobile || null,
      correspondent_whatsapp_no: formData.correspondentWhatsapp || null,
      correspondent_email_id: formData.correspondentEmail || null,
      principal_title: formData.principalTitle || null,
      principal_name: formData.principalName || null,
      principal_mobile_no: formData.principalMobile || null,
      principal_whatsapp_no: formData.principalWhatsapp || null,
      principal_email_id: formData.principalEmail || null,
    },
    trust: hasTrustData ? {
      trust_name: formData.trustName || null,
      organization_type: formData.orgType || null,
      registration_date: formData.orgRegDate || null,
      registration_number: formData.orgRegNumber || null,
      renewal_details: formData.orgRenewalDetails || null,
      trust_document_path: formData.trustDocumentPath || null,
      chairman_title: formData.chairmanTitle || null,
      chairman_name: formData.chairmanName || null,
      chairman_mobile_no: formData.chairmanMobile || null,
      chairman_whatsapp_no: formData.chairmanWhatsapp || null,
      chairman_email_id: formData.chairmanEmail || null,
      secretary_title: formData.secretaryTitle || null,
      secretary_name: formData.secretaryName || null,
      secretary_mobile_no: formData.secretaryMobile || null,
      secretary_whatsapp_no: formData.secretaryWhatsapp || null,
      secretary_email_id: formData.secretaryEmail || null,
      year_of_establishment: formData.establishmentYear ? parseInt(formData.establishmentYear) : null,
      classes_at_establishment: formData.establishmentClasses || null,
      opening_order_no: formData.openingOrderNo || null,
      rc_no: formData.rcNo || null,
      rc_date: formData.openingOrderDate || null,
      additional_classes_details: formData.additionalClassesDetails || null,
      additional_classes_order_path: formData.additionalClassesOrderPath || null,
      latest_renewal_details: formData.latestRenewalDetails || null,
      latest_renewal_order_path: formData.latestRenewalOrderPath || null,
      first_board_exam_10_year: formData.firstBoardExam10th ? parseInt(formData.firstBoardExam10th) : null,
      first_board_exam_12_year: formData.firstBoardExam12th ? parseInt(formData.firstBoardExam12th) : null,
      classes_from: formData.classesFunctioningFrom || null,
      classes_to: formData.classesFunctioningTo || null,
      is_pta_formed: formData.ptaFormed === 'Yes' || formData.ptaFormed === true || false,
      pta_affiliation_payment_details: formData.ptaAffiliationDetails || null,
      // CBSE fields
      cbse_noc_date_no: formData.cbseNocDateNo || null,
      cbse_noc_document_path: formData.cbseNocDocumentPath || null,
      cbse_affiliation_date_no: formData.cbseAffiliationDateNo || null,
      cbse_affiliation_classes: formData.cbseAffiliationClasses || null,
      cbse_affiliation_document_path: formData.cbseAffiliationDocumentPath || null,
      cbse_recognition_period_classes: formData.cbseRecognitionPeriodClasses || null,
      cbse_recognition_date_no: formData.cbseRecognitionDateNo || null,
      cbse_recognition_document_path: formData.cbseRecognitionDocumentPath || null,
    } : null,
    staff: {
      // Always include summary structure - let backend handle empty values
      summary: {
        teaching_pg_count: parseInt(formData.teachingPG) || 0,
        teaching_ug_count: parseInt(formData.teachingUG) || 0,
        teaching_sgt_count: parseInt(formData.teachingSGT) || 0,
        teaching_bed_count: parseInt(formData.teachingBEd) || 0,
        teaching_med_count: parseInt(formData.teachingMEd) || 0,
        tet_bed_qualified_count: parseInt(formData.teachingTETBEd) || 0,
        tet_sgt_qualified_count: parseInt(formData.teachingTETSecondary) || 0,
        // New teacher table fields
        secondary_grade_dted_count: parseInt(formData.secondaryGradeCount) || 0,
        secondary_grade_dted_tet_count: parseInt(formData.secondaryGradeTetCount) || 0,
        graduate_assistant_bed_count: parseInt(formData.graduateAssistantCount) || 0,
        graduate_assistant_bed_tet_count: parseInt(formData.graduateAssistantTetCount) || 0,
        post_graduate_teacher_count: parseInt(formData.postGraduateTeacherCount) || 0,
        computer_teacher_count: parseInt(formData.computerTeacherCount) || 0,
        computer_teacher_tet_count: parseInt(formData.computerTeacherTetCount) || 0,
        post_graduate_teacher_tet_count: parseInt(formData.postGraduateTeacherTetCount) || 0,
        physical_education_teacher_count: parseInt(formData.physicalEducationTeacherCount) || 0,
        physical_education_teacher_tet_count: parseInt(formData.physicalEducationTeacherTetCount) || 0,
        other_special_teacher_count: parseInt(formData.otherSpecialTeacherCount) || 0,
        other_special_teacher_tet_count: parseInt(formData.otherSpecialTeacherTetCount) || 0,
        support_office_staff_count: parseInt(formData.supportOfficeStaff) || 0,
        support_accountant_count: parseInt(formData.supportAccountants) || 0,
        support_library_staff_count: parseInt(formData.supportLibrary) || 0,
        support_drawing_staff_count: parseInt(formData.supportDrawing) || 0,
        support_pet_staff_count: parseInt(formData.supportPET) || 0,
        support_others_count: parseInt(formData.supportOthers) || 0,
      },
      // Always include nonTeaching structure
      nonTeaching: {
        oa_count: parseInt(formData.nonTeachingOA) || 0,
        driver_vehicle_helper_count: parseInt(formData.nonTeachingDrivers) || 0,
        watchman_count: parseInt(formData.nonTeachingWatchman) || 0,
        aaya_count: parseInt(formData.nonTeachingAaya) || 0,
        sweeper_count: parseInt(formData.nonTeachingSweepers) || 0,
        others_count: parseInt(formData.nonTeachingOthers) || 0,
      },
      // Students array - only include if classStrength exists and has data
      students: formData.classStrength && Object.keys(formData.classStrength).length > 0 ? Object.entries(formData.classStrength).map(([className, data]: [string, any]) => ({
        class_name: className,
        boys_count: parseInt(data.boys) || 0,
        girls_count: parseInt(data.girls) || 0,
        rte_count: parseInt(data.rte) || 0,
        emis_upload_path: data.emisPath || null,
      })) : [],
    },
    infrastructure: {
      // Infrastructure main - flat structure to match form
      // Always include infrastructure structure (let backend handle empty values)
      main: {
        school_location_type: formData.locationType || null,
        total_land_acres: formData.landAcres ? parseFloat(formData.landAcres) : null,
        total_land_sqft: formData.landSqFt ? parseFloat(formData.landSqFt) : null,
        is_land_sufficient_as_per_norms: formData.sufficientLand === 'Yes' || false,
        land_sufficient_details: formData.landShortageDetails || null,
        is_land_contiguous: formData.landContiguous === 'Yes' || formData.landContiguous === true || true,
        land_non_contiguous_distance_details: formData.landDistance || null,
        land_ownership_type: formData.landOwnership || null,
        lease_years: formData.leaseYears ? parseInt(formData.leaseYears) : null,
        num_buildings_blocks: parseInt(formData.numberOfBuildings) || 0,
        unapproved_building_regularisation_steps: formData.regularisationSteps || null,
        regularisation_fee_paid_rs: formData.regularisationFee ? parseInt(formData.regularisationFee) : null,
        regularisation_date_of_remittance: formData.regularisationDate || null,
        is_classrooms_commensurate: formData.adequateClassrooms === 'Yes' || formData.adequateClassrooms === true || false,
        classroom_size_sqft: formData.classroomSize ? parseFloat(formData.classroomSize) : null,
        classroom_photo_path: formData.classroomPhotoPath || null,
        toilets_boys_count: parseInt(formData.toiletsBoys) || 0,
        toilets_boys_photo_path: formData.toiletsBoysPhotoPath || null,
        toilets_girls_count: parseInt(formData.toiletsGirls) || 0,
        toilets_girls_photo_path: formData.toiletsGirlsPhotoPath || null,
        is_toilets_separate_boys_girls: formData.separateToilets === 'Yes' || formData.separateToilets === true || false,
        drinking_water_taps_count: parseInt(formData.drinkingWaterTaps) || 0,
        drinking_water_photo_path: formData.drinkingWaterPhotoPath || null,
        hand_wash_taps_count: parseInt(formData.handWashTaps) || 0,
        hand_wash_photo_path: formData.handWashPhotoPath || null,
        total_playground_area_sqft: formData.totalPlaygroundArea || null,
      },
      blocks: (() => {
        console.log('[DataMapper] ===== BUILDINGS MAPPING =====');
        console.log('[DataMapper] formData.buildings exists?', !!formData.buildings);
        console.log('[DataMapper] formData.buildingBlocks exists?', !!formData.buildingBlocks);
        console.log('[DataMapper] formData.buildings type:', typeof formData.buildings);
        console.log('[DataMapper] formData.buildingBlocks type:', typeof formData.buildingBlocks);
        
        // Check both buildings and buildingBlocks (from reverse mapping)
        const buildingsData = formData.buildings || formData.buildingBlocks;
        
        if (!buildingsData) {
          console.log('[DataMapper] Buildings: Neither formData.buildings nor formData.buildingBlocks exists');
          return [];
        }
        
        if (!Array.isArray(buildingsData)) {
          console.log('[DataMapper] Buildings: buildingsData is not an array, type:', typeof buildingsData);
          return [];
        }
        
        console.log('[DataMapper] Buildings: array length =', buildingsData.length);
        console.log('[DataMapper] Buildings: raw data =', JSON.stringify(buildingsData, null, 2));
        
        // Check each building block
        buildingsData.forEach((block: any, idx: number) => {
          console.log(`[DataMapper] Building ${idx}:`, {
            yearOfConstruction: block?.yearOfConstruction,
            numberOfFloors: block?.numberOfFloors,
            planApproved: block?.planApproved,
            isBuildingPlanApproved: block?.isBuildingPlanApproved,
            approvalDetails: block?.approvalDetails,
            hasData: !!(block?.yearOfConstruction || block?.numberOfFloors || block?.planApproved || block?.isBuildingPlanApproved || block?.approvalDetails)
          });
        });
        
        // Filter blocks that have data - check both field name variations
        // Also check if block is not just an empty object
        const filtered = buildingsData.filter((block: any, idx: number) => {
          if (!block || typeof block !== 'object') return false;
          
          // Check if block has any meaningful data
          const hasData = !!(
            (block.yearOfConstruction && String(block.yearOfConstruction).trim()) || 
            (block.numberOfFloors && String(block.numberOfFloors).trim()) || 
            (block.planApproved && String(block.planApproved).trim()) || 
            (block.isBuildingPlanApproved !== undefined && block.isBuildingPlanApproved !== null) ||
            (block.approvalDetails && String(block.approvalDetails).trim())
          );
          
          console.log(`[DataMapper] Building ${idx} has data?`, hasData, 'block:', block);
          return hasData;
        });
        console.log('[DataMapper] Buildings: filtered length =', filtered.length);
        console.log('[DataMapper] Buildings: filtered data =', JSON.stringify(filtered, null, 2));
        
        const mapped = filtered.map((block: any, index: number) => {
          const mappedBlock = {
            block_no: (index + 1) || parseInt(block.blockNo) || 0,
            year_of_construction: (block.yearOfConstruction && String(block.yearOfConstruction).trim()) || null,
            number_of_floors: (block.numberOfFloors && parseInt(block.numberOfFloors)) || 0,
            is_building_plan_approved: (block.planApproved === 'Yes' || block.planApproved === true || block.isBuildingPlanApproved === true || block.isBuildingPlanApproved === 1) ? 1 : 0,
            approval_details: (block.approvalDetails && String(block.approvalDetails).trim()) || null,
            approval_order_copy_path: (block.approvalOrderCopyPath && String(block.approvalOrderCopyPath).trim()) || null,
          };
          console.log(`[DataMapper] Mapped building ${index}:`, mappedBlock);
          return mappedBlock;
        });
        
        console.log('[DataMapper] Buildings: final mapped array length =', mapped.length);
        console.log('[DataMapper] ===== END BUILDINGS MAPPING =====');
        return mapped;
      })(),
      certificates: (() => {
        const certs = [];
        console.log('[DataMapper] ===== CERTIFICATES MAPPING =====');
        console.log('[DataMapper] Certificates: checking fields...');
        console.log('[DataMapper] formData.certificates exists?', !!formData.certificates);
        console.log('[DataMapper] formData.certificates is array?', Array.isArray(formData.certificates));
        console.log('[DataMapper] Certificates: stabilityNo =', formData.stabilityNo, '(type:', typeof formData.stabilityNo, ')');
        console.log('[DataMapper] Certificates: stabilityDateAuthority =', formData.stabilityDateAuthority);
        console.log('[DataMapper] Certificates: stabilityPersons =', formData.stabilityPersons);
        console.log('[DataMapper] Certificates: licenseNo =', formData.licenseNo);
        console.log('[DataMapper] Certificates: licenseDateAuthority =', formData.licenseDateAuthority);
        console.log('[DataMapper] Certificates: licensePersons =', formData.licensePersons);
        console.log('[DataMapper] Certificates: fireNocNo =', formData.fireNocNo);
        console.log('[DataMapper] Certificates: fireNocDateAuthority =', formData.fireNocDateAuthority);
        console.log('[DataMapper] Certificates: sanitaryNo =', formData.sanitaryNo);
        console.log('[DataMapper] Certificates: sanitaryDateAuthority =', formData.sanitaryDateAuthority);
        
        // If certificates is already an array (from reverse mapping), use it
        if (formData.certificates && Array.isArray(formData.certificates) && formData.certificates.length > 0) {
          console.log('[DataMapper] Certificates: Using existing certificates array, length:', formData.certificates.length);
          return formData.certificates.map((cert: any) => ({
            certificate_type: cert.certificateType || cert.certificate_type || null,
            certificate_no: cert.certificateNo || cert.certificate_no || null,
            date_authority: cert.dateAuthority || cert.date_authority || null,
            persons_accommodated: cert.personsAccommodated ? parseInt(cert.personsAccommodated) : (cert.persons_accommodated ? parseInt(cert.persons_accommodated) : null),
            certificate_document_path: cert.certificateDocumentPath || cert.certificate_document_path || null,
          }));
        }
        
        // Building Stability Certificate
        const stabilityNo = formData.stabilityNo && String(formData.stabilityNo).trim();
        const stabilityDate = formData.stabilityDateAuthority && String(formData.stabilityDateAuthority).trim();
        const stabilityPersons = formData.stabilityPersons && String(formData.stabilityPersons).trim();
        const hasStability = !!(stabilityNo || stabilityDate || stabilityPersons);
        console.log('[DataMapper] Certificates: Has Building Stability data?', hasStability, {
          stabilityNo,
          stabilityDate,
          stabilityPersons
        });
        if (hasStability) {
          console.log('[DataMapper] Certificates: ✅ Adding Building Stability');
          certs.push({
            certificate_type: 'Building Stability',
            certificate_no: stabilityNo || null,
            date_authority: stabilityDate || null,
            persons_accommodated: stabilityPersons ? parseInt(stabilityPersons) : null,
            certificate_document_path: (formData.stabilityDocumentPath && String(formData.stabilityDocumentPath).trim()) || null,
          });
        }
        
        // Building License Certificate
        const licenseNo = formData.licenseNo && String(formData.licenseNo).trim();
        const licenseDate = formData.licenseDateAuthority && String(formData.licenseDateAuthority).trim();
        const licensePersons = formData.licensePersons && String(formData.licensePersons).trim();
        const hasLicense = !!(licenseNo || licenseDate || licensePersons);
        console.log('[DataMapper] Certificates: Has Building License data?', hasLicense, {
          licenseNo,
          licenseDate,
          licensePersons
        });
        if (hasLicense) {
          console.log('[DataMapper] Certificates: ✅ Adding Building License');
          certs.push({
            certificate_type: 'Building License',
            certificate_no: licenseNo || null,
            date_authority: licenseDate || null,
            persons_accommodated: licensePersons ? parseInt(licensePersons) : null,
            certificate_document_path: (formData.licenseDocumentPath && String(formData.licenseDocumentPath).trim()) || null,
          });
        }
        
        // Fire NOC
        const fireNocNo = formData.fireNocNo && String(formData.fireNocNo).trim();
        const fireNocDate = formData.fireNocDateAuthority && String(formData.fireNocDateAuthority).trim();
        const hasFireNoc = !!(fireNocNo || fireNocDate);
        console.log('[DataMapper] Certificates: Has Fire NOC data?', hasFireNoc, {
          fireNocNo,
          fireNocDate
        });
        if (hasFireNoc) {
          console.log('[DataMapper] Certificates: ✅ Adding Fire NOC');
          certs.push({
            certificate_type: 'Fire NOC',
            certificate_no: fireNocNo || null,
            date_authority: fireNocDate || null,
            persons_accommodated: null,
            certificate_document_path: (formData.fireNocDocumentPath && String(formData.fireNocDocumentPath).trim()) || null,
          });
        }
        
        // Sanitary Certificate
        const sanitaryNo = formData.sanitaryNo && String(formData.sanitaryNo).trim();
        const sanitaryDate = formData.sanitaryDateAuthority && String(formData.sanitaryDateAuthority).trim();
        const hasSanitary = !!(sanitaryNo || sanitaryDate);
        console.log('[DataMapper] Certificates: Has Sanitary data?', hasSanitary, {
          sanitaryNo,
          sanitaryDate
        });
        if (hasSanitary) {
          console.log('[DataMapper] Certificates: ✅ Adding Sanitary');
          certs.push({
            certificate_type: 'Sanitary',
            certificate_no: sanitaryNo || null,
            date_authority: sanitaryDate || null,
            persons_accommodated: null,
            certificate_document_path: (formData.sanitaryDocumentPath && String(formData.sanitaryDocumentPath).trim()) || null,
          });
        }
        
        console.log('[DataMapper] Certificates: Total certificates =', certs.length);
        console.log('[DataMapper] Certificates: Final certificates array =', JSON.stringify(certs, null, 2));
        console.log('[DataMapper] ===== END CERTIFICATES MAPPING =====');
        return certs;
      })(),
      // Room details
      roomDetails: formData.roomDetails ? Object.entries(formData.roomDetails).map(([roomType, data]: [string, any]) => ({
        room_type: roomType,
        serial_no: data.sno || 0,
        num_rooms: parseInt(data.numRooms) || 0,
        block: data.block || null,
        floor: data.floor || null,
        area_sqft: data.areaSqft || null,
        roofing: data.roofing || null,
      })) : [],
      // Classroom grid
      classroomGrid: formData.classroomGrid ? Object.entries(formData.classroomGrid).map(([blockKey, data]: [string, any]) => ({
        block_no: parseInt(blockKey.replace('block_', '')) || 0,
        ground_floor_rooms: parseInt(data.ground) || 0,
        first_floor_rooms: parseInt(data.first) || 0,
        second_floor_rooms: parseInt(data.second) || 0,
        third_floor_rooms: parseInt(data.third) || 0,
      })) : [],
    },
    fees: {
      feesFixation: {
        has_fees_fixation_order: formData.feesFixationOrder === 'Yes' ? 1 : 0,
        fees_fixation_order_path: formData.feesFixationOrderPath || null,
        pta_consulted_during_fixation: formData.ptaConsulted === 'Yes' ? 1 : 0,
        pta_consultation_details: formData.ptaConsultationDetails || null,
        fees_collected_by_school: formData.feesCollected || null,
        fees_fixed_by_committee: formData.feesFixedByCommittee || null,
      },
      expenses: (() => {
        const expensesArray = [];
        if (formData.expenses) {
          Object.entries(formData.expenses).forEach(([category, classLevels]: [string, any]) => {
            Object.entries(classLevels).forEach(([classLevel, amounts]: [string, any]) => {
              if (amounts.monthly && amounts.monthly !== '0') {
                expensesArray.push({
                  expense_category: category,
                  class_level: classLevel,
                  amount: parseFloat(amounts.monthly),
                });
              }
            });
          });
        }
        return expensesArray;
      })(),
      vehicles: {
        number_of_vans: parseInt(formData.vehiclesVan) || 0,
        number_of_buses: parseInt(formData.vehiclesBus) || 0,
        other_vehicles_count: parseInt(formData.vehiclesOther) || 0,
      },
      others: {
        last_year_auditing_filed: formData.lastYearAuditFiled === 'Yes' ? 1 : 0,
        last_3_years_audit_status: formData.last3YearsAudit || null,
        has_health_care_center: formData.healthCareAvailable === 'Yes' ? 1 : 0,
        health_care_details: formData.healthCareDetails || null,
        social_awareness_program_conducted: formData.socialAwarenessProgram === 'Yes' ? 1 : 0,
        social_awareness_details: formData.socialAwarenessDetails || null,
        social_service_program_conducted: formData.socialServicesProgram === 'Yes' ? 1 : 0,
        social_services_details: formData.socialServicesDetails || null,
        salary_processed_through_ecs: formData.salaryECS === 'Yes' ? 1 : 0,
        declaration_accepted: formData.declaration ? 1 : 0,
      },
    },
  };
  
  console.log('[DataMapper] ========================================');
  console.log('[DataMapper] FINAL mapped data structure:');
  console.log('[DataMapper] infrastructure.blocks length:', result.infrastructure.blocks.length);
  console.log('[DataMapper] infrastructure.certificates length:', result.infrastructure.certificates.length);
  console.log('[DataMapper] infrastructure.blocks:', JSON.stringify(result.infrastructure.blocks, null, 2));
  console.log('[DataMapper] infrastructure.certificates:', JSON.stringify(result.infrastructure.certificates, null, 2));
  console.log('[DataMapper] ========================================');
  
  return result;
}

/**
 * Map backend data to frontend form format
 */
export function mapBackendDataToForm(backendData: any) {
  if (!backendData) return {};
  
  const basic = backendData.basic || {};
  const trust = backendData.trust || {};
  const staff = backendData.staff || {};
  const infrastructure = backendData.infrastructure || {};
  const fees = backendData.fees || {};

  const schoolTypes = [];
  if (basic.is_nursery_primary) schoolTypes.push('N&P (Nursery & Primary)');
  if (basic.is_matriculation) schoolTypes.push('Matriculation');
  if (basic.is_state_board_sf) schoolTypes.push('State Board SF');
  if (basic.is_cbse) schoolTypes.push('CBSE');
  if (basic.is_icse) schoolTypes.push('ICSE');
  if (basic.is_igcse) schoolTypes.push('IGCSE');
  if (basic.is_ib) schoolTypes.push('IB');

  const classStrength: any = {};
  if (staff.students && Array.isArray(staff.students)) {
    staff.students.forEach((student: any) => {
      classStrength[student.class_name] = {
        boys: student.boys_count || 0,
        girls: student.girls_count || 0,
        rte: student.rte_count || 0,
        emisPath: student.emis_upload_path || null,
      };
    });
  }

  return {
    schoolCode: basic.school_code || '',
    schoolName: basic.school_name || '',
    address: basic.school_address || '',
    taluk: basic.taluk || '',
    localBody: basic.locality || '',
    pinCode: basic.pin_code || '',
    schoolMobile: basic.school_mobile_no || '',
    schoolWhatsapp: basic.school_whatsapp_no || '',
    schoolEmail: basic.school_email_id || '',
    schoolTypes,
    correspondentTitle: basic.correspondent_title || '',
    correspondentName: basic.correspondent_name || '',
    correspondentMobile: basic.correspondent_mobile_no || '',
    correspondentWhatsapp: basic.correspondent_whatsapp_no || '',
    correspondentEmail: basic.correspondent_email_id || '',
    principalTitle: basic.principal_title || '',
    principalName: basic.principal_name || '',
    principalMobile: basic.principal_mobile_no || '',
    principalWhatsapp: basic.principal_whatsapp_no || '',
    principalEmail: basic.principal_email_id || '',
    // Trust Management - flat structure to match form
    trustName: trust.trust_name || '',
    orgType: trust.organization_type || '',
    orgRegDate: trust.registration_date || '',
    orgRegNumber: trust.registration_number || '',
    orgRenewalDetails: trust.renewal_details || '',
    trustDocumentPath: trust.trust_document_path || '',
    chairmanTitle: trust.chairman_title || '',
    chairmanName: trust.chairman_name || '',
    chairmanMobile: trust.chairman_mobile_no || '',
    chairmanWhatsapp: trust.chairman_whatsapp_no || '',
    chairmanEmail: trust.chairman_email_id || '',
    secretaryTitle: trust.secretary_title || '',
    secretaryName: trust.secretary_name || '',
    secretaryMobile: trust.secretary_mobile_no || '',
    secretaryWhatsapp: trust.secretary_whatsapp_no || '',
    secretaryEmail: trust.secretary_email_id || '',
    establishmentYear: trust.year_of_establishment?.toString() || '',
    establishmentClasses: trust.classes_at_establishment || '',
    openingOrderNo: trust.opening_order_no || '',
    rcNo: trust.rc_no || '',
    openingOrderDate: trust.rc_date || '',
    additionalClassesDetails: trust.additional_classes_details || '',
    additionalClassesOrderPath: trust.additional_classes_order_path || '',
    latestRenewalDetails: trust.latest_renewal_details || '',
    latestRenewalOrderPath: trust.latest_renewal_order_path || '',
    firstBoardExam10th: trust.first_board_exam_10_year?.toString() || '',
    firstBoardExam12th: trust.first_board_exam_12_year?.toString() || '',
    classesFunctioningFrom: trust.classes_from || '',
    classesFunctioningTo: trust.classes_to || '',
    ptaFormed: trust.is_pta_formed === 1 ? 'Yes' : 'No',
    ptaAffiliationDetails: trust.pta_affiliation_payment_details || '',
    // CBSE fields
    cbseNocDateNo: trust.cbse_noc_date_no || '',
    cbseNocDocumentPath: trust.cbse_noc_document_path || '',
    cbseAffiliationDateNo: trust.cbse_affiliation_date_no || '',
    cbseAffiliationClasses: trust.cbse_affiliation_classes || '',
    cbseAffiliationDocumentPath: trust.cbse_affiliation_document_path || '',
    cbseRecognitionPeriodClasses: trust.cbse_recognition_period_classes || '',
    cbseRecognitionDateNo: trust.cbse_recognition_date_no || '',
    cbseRecognitionDocumentPath: trust.cbse_recognition_document_path || '',
    // Staff & Students - flat structure to match form
    teachingPG: staff.summary?.teaching_pg_count?.toString() || '',
    teachingUG: staff.summary?.teaching_ug_count?.toString() || '',
    teachingSGT: staff.summary?.teaching_sgt_count?.toString() || '',
    teachingBEd: staff.summary?.teaching_bed_count?.toString() || '',
    teachingMEd: staff.summary?.teaching_med_count?.toString() || '',
    teachingTETBEd: staff.summary?.tet_bed_qualified_count?.toString() || '',
    teachingTETSecondary: staff.summary?.tet_sgt_qualified_count?.toString() || '',
    // New teacher table fields
    secondaryGradeCount: staff.summary?.secondary_grade_dted_count?.toString() || '',
    secondaryGradeTetCount: staff.summary?.secondary_grade_dted_tet_count?.toString() || '',
    graduateAssistantCount: staff.summary?.graduate_assistant_bed_count?.toString() || '',
    graduateAssistantTetCount: staff.summary?.graduate_assistant_bed_tet_count?.toString() || '',
    postGraduateTeacherCount: staff.summary?.post_graduate_teacher_count?.toString() || '',
    postGraduateTeacherTetCount: staff.summary?.post_graduate_teacher_tet_count?.toString() || '',
    computerTeacherCount: staff.summary?.computer_teacher_count?.toString() || '',
    computerTeacherTetCount: staff.summary?.computer_teacher_tet_count?.toString() || '',
    physicalEducationTeacherCount: staff.summary?.physical_education_teacher_count?.toString() || '',
    physicalEducationTeacherTetCount: staff.summary?.physical_education_teacher_tet_count?.toString() || '',
    otherSpecialTeacherCount: staff.summary?.other_special_teacher_count?.toString() || '',
    otherSpecialTeacherTetCount: staff.summary?.other_special_teacher_tet_count?.toString() || '',
    supportOfficeStaff: staff.summary?.support_office_staff_count?.toString() || '',
    supportAccountants: staff.summary?.support_accountant_count?.toString() || '',
    supportLibrary: staff.summary?.support_library_staff_count?.toString() || '',
    supportDrawing: staff.summary?.support_drawing_staff_count?.toString() || '',
    supportPET: staff.summary?.support_pet_staff_count?.toString() || '',
    supportOthers: staff.summary?.support_others_count?.toString() || '',
    // Non-Teaching Staff - flat structure
    nonTeachingOA: staff.nonTeaching?.oa_count?.toString() || '',
    nonTeachingDrivers: staff.nonTeaching?.driver_vehicle_helper_count?.toString() || '',
    nonTeachingWatchman: staff.nonTeaching?.watchman_count?.toString() || '',
    nonTeachingAaya: staff.nonTeaching?.aaya_count?.toString() || '',
    nonTeachingSweepers: staff.nonTeaching?.sweeper_count?.toString() || '',
    nonTeachingOthers: staff.nonTeaching?.others_count?.toString() || '',
    classStrength,
    // Infrastructure - flat structure to match form expectations
    locationType: infrastructure.main?.school_location_type || '',
    landAcres: infrastructure.main?.total_land_acres?.toString() || '',
    landSqFt: infrastructure.main?.total_land_sqft?.toString() || '',
    sufficientLand: infrastructure.main?.is_land_sufficient_as_per_norms === 1 ? 'Yes' : 'No',
    landShortageDetails: infrastructure.main?.land_sufficient_details || '',
    landContiguous: infrastructure.main?.is_land_contiguous === 1 ? 'Yes' : 'No',
    landDistance: infrastructure.main?.land_non_contiguous_distance_details || '',
    landOwnership: infrastructure.main?.land_ownership_type || '',
    leaseYears: infrastructure.main?.lease_years?.toString() || '',
    numberOfBuildings: infrastructure.main?.num_buildings_blocks?.toString() || '',
    regularisationSteps: infrastructure.main?.unapproved_building_regularisation_steps || '',
    regularisationFee: infrastructure.main?.regularisation_fee_paid_rs?.toString() || '',
    regularisationDate: infrastructure.main?.regularisation_date_of_remittance || '',
    adequateClassrooms: infrastructure.main?.is_classrooms_commensurate === 1 ? 'Yes' : 'No',
    classroomSize: infrastructure.main?.classroom_size_sqft?.toString() || '',
    classroomPhotoPath: infrastructure.main?.classroom_photo_path || '',
    toiletsBoys: infrastructure.main?.toilets_boys_count?.toString() || '',
    toiletsBoysPhotoPath: infrastructure.main?.toilets_boys_photo_path || '',
    toiletsGirls: infrastructure.main?.toilets_girls_count?.toString() || '',
    toiletsGirlsPhotoPath: infrastructure.main?.toilets_girls_photo_path || '',
    separateToilets: infrastructure.main?.is_toilets_separate_boys_girls === 1 ? 'Yes' : 'No',
    drinkingWaterTaps: infrastructure.main?.drinking_water_taps_count?.toString() || '',
    drinkingWaterPhotoPath: infrastructure.main?.drinking_water_photo_path || '',
    handWashTaps: infrastructure.main?.hand_wash_taps_count?.toString() || '',
    handWashPhotoPath: infrastructure.main?.hand_wash_photo_path || '',
    totalPlaygroundArea: infrastructure.main?.total_playground_area_sqft || '',
    // Room details - nested object keyed by room type
    roomDetails: (() => {
      const rd: any = {};
      if (infrastructure.roomDetails && Array.isArray(infrastructure.roomDetails)) {
        infrastructure.roomDetails.forEach((room: any) => {
          rd[room.room_type] = {
            numRooms: room.num_rooms?.toString() || '',
            block: room.block || '',
            floor: room.floor || '',
            areaSqft: room.area_sqft || '',
            roofing: room.roofing || '',
          };
        });
      }
      return rd;
    })(),
    // Classroom grid - nested object keyed by block
    classroomGrid: (() => {
      const cg: any = {};
      if (infrastructure.classroomGrid && Array.isArray(infrastructure.classroomGrid)) {
        infrastructure.classroomGrid.forEach((row: any) => {
          cg[`block_${row.block_no}`] = {
            ground: row.ground_floor_rooms?.toString() || '',
            first: row.first_floor_rooms?.toString() || '',
            second: row.second_floor_rooms?.toString() || '',
            third: row.third_floor_rooms?.toString() || '',
          };
        });
      }
      return cg;
    })(),
    // Buildings - flat array to match form expectations
    buildings: infrastructure.blocks ? infrastructure.blocks.map((block: any) => ({
      yearOfConstruction: block.year_of_construction || '',
      numberOfFloors: block.number_of_floors?.toString() || '',
      planApproved: block.is_building_plan_approved === 1 ? 'Yes' : 'No',
      approvalDetails: block.approval_details || '',
      approvalOrderCopyPath: block.approval_order_copy_path || '',
    })) : [{}, {}, {}],
    // Certificates - map from backend array to flat fields
    stabilityNo: (() => {
      const stabilityCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Building Stability' || cert.certificateType === 'Building Stability'
      );
      return stabilityCert?.certificate_no || stabilityCert?.certificateNo || '';
    })(),
    stabilityDateAuthority: (() => {
      const stabilityCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Building Stability' || cert.certificateType === 'Building Stability'
      );
      return stabilityCert?.date_authority || stabilityCert?.dateAuthority || '';
    })(),
    stabilityPersons: (() => {
      const stabilityCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Building Stability' || cert.certificateType === 'Building Stability'
      );
      return stabilityCert?.persons_accommodated?.toString() || stabilityCert?.personsAccommodated?.toString() || '';
    })(),
    stabilityDocumentPath: (() => {
      const stabilityCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Building Stability' || cert.certificateType === 'Building Stability'
      );
      return stabilityCert?.certificate_document_path || stabilityCert?.certificateDocumentPath || '';
    })(),
    licenseNo: (() => {
      const licenseCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Building License' || cert.certificateType === 'Building License'
      );
      return licenseCert?.certificate_no || licenseCert?.certificateNo || '';
    })(),
    licenseDateAuthority: (() => {
      const licenseCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Building License' || cert.certificateType === 'Building License'
      );
      return licenseCert?.date_authority || licenseCert?.dateAuthority || '';
    })(),
    licensePersons: (() => {
      const licenseCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Building License' || cert.certificateType === 'Building License'
      );
      return licenseCert?.persons_accommodated?.toString() || licenseCert?.personsAccommodated?.toString() || '';
    })(),
    licenseDocumentPath: (() => {
      const licenseCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Building License' || cert.certificateType === 'Building License'
      );
      return licenseCert?.certificate_document_path || licenseCert?.certificateDocumentPath || '';
    })(),
    fireNocNo: (() => {
      const fireCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Fire NOC' || cert.certificateType === 'Fire NOC'
      );
      return fireCert?.certificate_no || fireCert?.certificateNo || '';
    })(),
    fireNocDateAuthority: (() => {
      const fireCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Fire NOC' || cert.certificateType === 'Fire NOC'
      );
      return fireCert?.date_authority || fireCert?.dateAuthority || '';
    })(),
    fireNocDocumentPath: (() => {
      const fireCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Fire NOC' || cert.certificateType === 'Fire NOC'
      );
      return fireCert?.certificate_document_path || fireCert?.certificateDocumentPath || '';
    })(),
    sanitaryNo: (() => {
      const sanitaryCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Sanitary' || cert.certificateType === 'Sanitary'
      );
      return sanitaryCert?.certificate_no || sanitaryCert?.certificateNo || '';
    })(),
    sanitaryDateAuthority: (() => {
      const sanitaryCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Sanitary' || cert.certificateType === 'Sanitary'
      );
      return sanitaryCert?.date_authority || sanitaryCert?.dateAuthority || '';
    })(),
    sanitaryDocumentPath: (() => {
      const sanitaryCert = infrastructure.certificates?.find((cert: any) =>
        cert.certificate_type === 'Sanitary' || cert.certificateType === 'Sanitary'
      );
      return sanitaryCert?.certificate_document_path || sanitaryCert?.certificateDocumentPath || '';
    })(),
    // Fees - flat structure to match form expectations
    feesFixationOrder: fees.feesFixation?.has_fees_fixation_order === 1 ? 'Yes' : 'No',
    feesFixationOrderPath: fees.feesFixation?.fees_fixation_order_path || '',
    ptaConsulted: fees.feesFixation?.pta_consulted_during_fixation === 1 ? 'Yes' : 'No',
    ptaConsultationDetails: fees.feesFixation?.pta_consultation_details || '',
    feesCollected: fees.feesFixation?.fees_collected_by_school || '',
    feesFixedByCommittee: fees.feesFixation?.fees_fixed_by_committee || '',
    // Expenses - structured to match form expectations
    expenses: (() => {
      const expenseMap: any = {};
      if (fees.expenses && Array.isArray(fees.expenses)) {
        fees.expenses.forEach((expense: any) => {
          const category = expense.expense_category;
          const classLevel = expense.class_level;
          if (!expenseMap[category]) {
            expenseMap[category] = {};
          }
          expenseMap[category][classLevel] = {
            monthly: expense.amount?.toString() || '0',
            yearly: '0' // Default yearly to 0 since backend doesn't have yearly
          };
        });
      }
      // Ensure all expense categories exist even if empty
      const allCategories = ['teachingSalary', 'nonTeachingSalary', 'ebBill', 'miscExpenses', 'transportExp', 'buildingMaintenance', 'booksPurchase', 'advertisement', 'propertyTax', 'softwareDigital', 'otherExpenses'];
      const allClassGroups = ['PKG/LKG/UKG', 'I-III', 'IV-V', 'VI-VIII', 'IX-X', 'XI-XII'];
      allCategories.forEach(category => {
        if (!expenseMap[category]) {
          expenseMap[category] = {};
        }
        allClassGroups.forEach(classGroup => {
          if (!expenseMap[category][classGroup]) {
            expenseMap[category][classGroup] = { monthly: '0', yearly: '0' };
          }
        });
      });
      return expenseMap;
    })(),
    // Vehicles - flat structure
    vehiclesVan: fees.vehicles?.number_of_vans?.toString() || '',
    vehiclesBus: fees.vehicles?.number_of_buses?.toString() || '',
    vehiclesOther: fees.vehicles?.other_vehicles_count?.toString() || '',
    // Other details - flat structure
    lastYearAuditFiled: fees.others?.last_year_auditing_filed === 1 ? 'Yes' : 'No',
    last3YearsAudit: fees.others?.last_3_years_audit_status || '',
    healthCareAvailable: fees.others?.has_health_care_center === 1 ? 'Yes' : 'No',
    healthCareDetails: fees.others?.health_care_details || '',
    socialAwarenessProgram: fees.others?.social_awareness_program_conducted === 1 ? 'Yes' : 'No',
    socialAwarenessDetails: fees.others?.social_awareness_details || '',
    socialServicesProgram: fees.others?.social_service_program_conducted === 1 ? 'Yes' : 'No',
    socialServicesDetails: fees.others?.social_services_details || '',
    salaryECS: fees.others?.salary_processed_through_ecs === 1 ? 'Yes' : 'No',
    declaration: fees.others?.declaration_accepted === 1,
  };
}
