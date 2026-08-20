import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { useToast } from '../../components/Toast';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amountStr = searchParams.get('amount');

  const { settlements, completeSettlement } = useAppContext();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [matchedSettlement, setMatchedSettlement] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    if (orderId) {
      const settlementId = orderId.split('_')[0];
      const found = settlements.find((s) => s.id === settlementId);
      if (found) {
        setMatchedSettlement(found);
      }
      
      // 상태 업데이트 수행
      completeSettlement(settlementId);
      
      const timer = setTimeout(() => {
        setIsUpdating(false);
        showToast('정산 결제가 완료되어 상태가 업데이트되었습니다! 🎉', 'success', '🎉');
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setIsUpdating(false);
    }
  }, [orderId, completeSettlement, showToast]);

  const handleGoBack = () => {
    navigate('/calculate');
  };

  const amount = amountStr ? parseInt(amountStr, 10) : (matchedSettlement?.amount || 0);

  return (
    <Container>
      <Card>
        <SuccessIconWrapper>
          <CheckMarkSvg viewBox="0 0 52 52">
            <CheckCircle cx="26" cy="26" r="25" fill="none" />
            <CheckPath fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </CheckMarkSvg>
        </SuccessIconWrapper>

        <Title>정산 결제 완료</Title>
        <Subtitle>
          {isUpdating ? '정산 정보를 업데이트하는 중입니다...' : '토스페이먼츠를 통한 정산이 성공적으로 완료되었습니다!'}
        </Subtitle>

        <Divider />

        <InfoGrid>
          <InfoRow>
            <InfoLabel>정산 내역</InfoLabel>
            <InfoValue>{matchedSettlement?.title || '일반 정산'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>카테고리</InfoLabel>
            <InfoValue>{matchedSettlement?.category || '모임 정산'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>정산 금액</InfoLabel>
            <InfoValue className="amount">₩{amount.toLocaleString()}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주문 ID</InfoLabel>
            <InfoValue className="mono">{orderId || '-'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제 키</InfoLabel>
            <InfoValue className="mono truncated" title={paymentKey || ''}>
              {paymentKey ? `${paymentKey.substring(0, 18)}...` : '-'}
            </InfoValue>
          </InfoRow>
        </InfoGrid>

        <ConfirmButton type="button" onClick={handleGoBack} disabled={isUpdating}>
          {isUpdating ? '처리 중...' : '확인'}
        </ConfirmButton>
      </Card>
    </Container>
  );
};

// Animations
const scaleUp = keyframes`
  from { transform: scale(0.9) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
`;

const strokeCircle = keyframes`
  to { stroke-dashoffset: 0; }
`;

const strokeCheck = keyframes`
  to { stroke-dashoffset: 0; }
`;

const fillCircle = keyframes`
  to { box-shadow: inset 0px 0px 0px 30px #8FCB9B; }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 128px);
  padding: 24px;
  background: #FFFBF3;
  box-sizing: border-box;
`;

const Card = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 400px;
  border-radius: 28px;
  padding: 32px 24px;
  box-shadow: 0 10px 30px rgba(38, 38, 44, 0.06);
  border: 1px solid #f0eae0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${scaleUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  box-sizing: border-box;
`;

const SuccessIconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #8FCB9B;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #8FCB9B;
  animation: ${fillCircle} 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
  margin-bottom: 20px;
`;

const CheckMarkSvg = styled.svg`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #ffffff;
  stroke-miterlimit: 10;
`;

const CheckCircle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #8FCB9B;
  fill: none;
  animation: ${strokeCircle} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const CheckPath = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: ${strokeCheck} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
`;

const Title = styled.h2`
  font-size: 21px;
  font-weight: 800;
  color: #1c1c1e;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #8a8a93;
  margin: 0;
  line-height: 1.5;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #f0eae0;
  margin: 24px 0;
`;

const InfoGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #8a8a93;
`;

const InfoValue = styled.span`
  font-weight: 700;
  color: #26262c;
  text-align: right;

  &.amount {
    color: #a87515;
    font-size: 15px;
    font-weight: 800;
  }

  &.mono {
    font-family: monospace;
    font-size: 12px;
    color: #4b5563;
  }

  &.truncated {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  background: #fedd13;
  color: #111827;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 14px rgba(254, 221, 19, 0.4);
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: #f5cf00;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
