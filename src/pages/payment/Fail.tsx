import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const PaymentFail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message') || '결제 중 알 수 없는 에러가 발생했습니다.';
  const orderId = searchParams.get('orderId');

  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/calculate');
  };

  return (
    <Container>
      <Card>
        <ErrorIconWrapper>
          <ErrorSvg viewBox="0 0 52 52">
            <ErrorCircle cx="26" cy="26" r="25" fill="none" />
            <CrossPath1 fill="none" d="M16 16l20 20" />
            <CrossPath2 fill="none" d="M36 16L16 36" />
          </ErrorSvg>
        </ErrorIconWrapper>

        <Title>결제 실패</Title>
        <Subtitle>
          정산 결제 진행 중 오류가 발생하여 완료되지 못했습니다.
        </Subtitle>

        <Divider />

        <InfoGrid>
          <InfoRow>
            <InfoLabel>실패 코드</InfoLabel>
            <InfoValue className="mono">{code || 'UNKNOWN_ERROR'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>실패 사유</InfoLabel>
            <InfoValue className="error-message">{message}</InfoValue>
          </InfoRow>
          {orderId && (
            <InfoRow>
              <InfoLabel>주문 ID</InfoLabel>
              <InfoValue className="mono">{orderId}</InfoValue>
            </InfoRow>
          )}
        </InfoGrid>

        <ConfirmButton type="button" onClick={handleRetry}>
          돌아가기
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

const strokeCross = keyframes`
  to { stroke-dashoffset: 0; }
`;

const fillCircle = keyframes`
  to { box-shadow: inset 0px 0px 0px 30px #EF4444; }
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

const ErrorIconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #EF4444;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #EF4444;
  animation: ${fillCircle} 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
  margin-bottom: 20px;
`;

const ErrorSvg = styled.svg`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #ffffff;
  stroke-miterlimit: 10;
`;

const ErrorCircle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #EF4444;
  fill: none;
  animation: ${strokeCircle} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const CrossPath1 = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: ${strokeCross} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
`;

const CrossPath2 = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: ${strokeCross} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
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

  &.error-message {
    color: #EF4444;
    font-size: 13px;
    max-width: 200px;
    word-break: keep-all;
  }

  &.mono {
    font-family: monospace;
    font-size: 12px;
    color: #4b5563;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  background: #f1f5f9;
  color: #334155;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  border: 1px solid #cbd5e1;
  transition: all 0.15s ease;

  &:hover {
    background: #e2e8f0;
  }
`;
